import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import cloudinary from 'cloudinary';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import PaymentRouter from './routes/paymentRoute.js';
import bodyParser from 'body-parser';
// import fileUpload from 'express-fileupload';

const app = express();
app.use(cookieParser());
// app.use(fileUpload());

// dotenv config
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
import connectDB from './config/dbConn.js';
import VerifyRouter from './routes/accountVerifyRoutes.js';
import passRoutes from './routes/passRoutes.js';
connectDB();

// built-in middleware for json
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CONNECT to PayPal API
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// Google Choose Map API
app.get('/api/keys/google', (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || 'Maps' });
});

// Custom APIs & their Routes

app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/pass', passRoutes);
app.use('/api/account', VerifyRouter);
app.use('/api/orders', orderRouter);
app.use('/api', PaymentRouter);
///////////////// APIs ends here

// 404 response to any request without authorization header and redirect to login
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message });
});

// Port Config
const port = process.env.PORT || 5000;

// to serve images inside public folder
app.use(express.static('public'));
app.use('/images', express.static('images'));

// http and socket.io
const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];

io.on('connection', (socket) => {
  // console.log('connection', socket.id);
  socket.on('disconnect', () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      // console.log('Offline', user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('updateUser', user);
      }
    }
  });
  socket.on('onLogin', (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    // console.log('Online', user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit('updateUser', updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit('listUsers', users);
    }
  });

  socket.on('onUserSelected', (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit('selectUser', existUser);
    }
  });

  socket.on('onMessage', (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit('message', message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('message', message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit('message', {
          name: 'Support',
          body: 'We will reply to you as soon as our support team gets online.',
        });
      }
    }
  });
});

// Server config

httpServer.listen(port, () => {
  console.log(`Server Runs Successfully at http://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`Server Runs Successfully at http://localhost:${port}`);
// });
