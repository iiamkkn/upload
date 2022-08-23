import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log('DB is Connected Successfully');
      });
  } catch (err) {
    console.error(err);
    console.log(err.message);
  }
};

export default connectDB;

// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log('DB Connected Successfully');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
