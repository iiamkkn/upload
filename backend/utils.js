import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mg from 'mailgun-js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: bcrypt.hashSync(user.email, 10),
      image: user.image,
      username: user.username,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      isVerified: user.isVerified,
      followers: user.followers,
      following: user.following,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user || (req.user && req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Seller Token' });
  }
};
export const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin/Seller Token' });
  }
};

/// sending email notification on each paid purchase

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

export const payOrderEmailTemplate = (order) => {
  return `
  
  <div style="background-color: #fff; padding: 7px;">

   <center>
   
    <img src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1659041257/samples/EMAIL_COVER_TRANS_v41act.png" alt="Zalazon."
    style="height: 100px; margin:auto;" />
    
    </center>

  <h1 style="
  color: #0dcf00;
  font-weight: normal;
  border-top: 1px solid #f4f4f7;
  margin-top: -15px;
  padding: 10px;
  font-size: 0.9rem;
  padding-bottom: 0px;
  padding-left: 0;
  ">Thanks  &nbsp; <b style="color:#000;"> ${
    order.user.name
  } </b>  &nbsp; for shopping at <b style="color:#000; font-weight: normal;">Zalazon.</b></h1>

  
  <p style="
  color: #7e7e7e; border-bottom: 1px solid #f4f4f7; padding-bottom: 10px; margin-top: -6px;">
  We are processing your order and it will be delivered soon. Below, you can find your order details.
  </p>
 
  <table style="
  font-size: 16px;
">
  <thead>

  
  
  
  </thead>
  <tbody>
 
  
  </tbody>
  <tfoot>
  <tr>
  <td colspan="5"><strong>Product</strong></td>
  <td align="right"> <strong>Details</strong></td>
  </tr>

  <tr>
  ${order.orderItems
    .map(
      (item) => `
      
  <td colspan="5">Name:</td>
  <td align="right"> ${item.name} </td>
  </tr>

  `
    )
    .join('\n')}
  

  <tr>
  <td colspan="5">1DB Price:</td>
  <td align="right"> ${order.itemsPrice.toFixed(2)} HUF</td>
  </tr>
  <tr>
  <td colspan="5">Quantity:</td>
  ${order.orderItems.map(
    (itemQTY) => `
      <td align="right"> ${itemQTY.quantity}</td>
  `
  )}
  
  </tr>
  <tr>
  <td colspan="5">Shipping Fee:</td>
  <td align="right"> ${order.shippingPrice.toFixed(2)} HUF</td>
  </tr>

  <tr>
  <td colspan="5">Tax Fee:</td>
  <td align="right"> ${order.taxPrice.toFixed(2)} HUF</td>
  </tr>

  <tr>
  <td colspan="5"><strong>Total Price:</strong></td>
  <td align="right"><strong> ${order.totalPrice.toFixed(2)} HUF</strong></td>
  </tr>
  <tr>
  <td colspan="5">Payment Method:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>

  <h2 style="color: #7e7e7e;
  font-size: 0.8rem;
  font-weight: normal;
  padding-top:5px;
  padding-bottom:5px;
  border-top: 1px solid #f4f4f7;
  border-bottom: 1px solid #f4f4f7;
  "> You bought this product on <b>${order.createdAt
    .toString()
    .substring(0, 10)}</b></h2>
  </table>
  
  <h2 style="color: #7e7e7e;">Shipping address</h2>
  <p style="
  font-size: 0.9rem;
">
  <b>${order.shippingAddress.fullName}</b>,<br/>
  <p style="color: #7e7e7e; font-size: 0.9rem;">${
    order.shippingAddress.address
  }, 
  ${order.shippingAddress.postalCode},
  ${order.shippingAddress.city}, 
  ${order.shippingAddress.country}
  </p>
  </p>
  <hr/>
  <p style="color: #7e7e7e;">
  DO NOT REPLY TO THIS EMAIL.
  </p> 

 </div>
  `;
};

/* Header


<div style="
    padding: 0px 24rem 0px 1rem; margin: auto; width: 0vw;
    ">

    <h1 style="

  color: #000;
  font-weight: bold;
  font-size: 2rem;
  font-family: 'Urbanist',sans-serif!important;
  border: none;
  cursor:context-menu;
  ">
  
  <img src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1659037246/samples/email_icon_transparent_bg_png_ncpv1r.png" alt="Z." style="
  width: 51px;
  position: absolute;
  height: 50px;
  margin-top: -10px;
  background: #f1f1f1;
  border: none;
  border-radius: 100%;
  padding: 8px;

  "></img>

<p style="margin-left: 86px; margin-top: -66px; ">Zalazon.</p> </h1>
</div>

*/
/* 
<div style="display: flex;
  flex-wrap: wrap;
  border: 1px solid #fff;
  border-radius: 4px;
  width: 40vw;
  background-color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
  align-items: center;
  margin: auto;">

  <div style="display: flex;
  background-color: #fff;
  width: 100%;
  padding-top: 7px;
  padding-bottom: 5px;
  font-weight: bold;
  font-size: 1.7rem;
  justify-content: center;
  font-family: 'Urbanist', sans-serif !important;
  border: none;">Zalazon.</div>

  <div style="display: flex;
  color: #2bd14e;
  justify-content: center;
  font-weight: bold;
  padding-top: 5px;
  margin-bottom: 2px;
  border-top: 1px solid #f4f4f7;
  background-color: #fff;
  padding: 10px;
font-size:0.8rem;
  width: 100%;">Thank you <p style="color:'black">${
    order.user.name
  }</p> for shopping with us.</div>

  
  <div style="  display: flex;
  flex: 1;
  flex-direction: column;">
  ${
    order.orderItems.map(
      (item) => `
    
  
    <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
      <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;">You bought ${item.name} at ${order.createdAt
        .toString()
        .substring(0, 10)}</div>
     
    </div>

    <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
    <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;">Product Name:</div>
    <div style="display: flex;
  flex: 2;
  text-align: center;
  justify-content: flex-end;
  font-weight: bold;
  margin: auto;">${item.name}</div>
  </div>

    <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
      <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;">Order id:</div>
      <div style="display: flex;
  flex: 2;
  text-align: center;
  justify-content: flex-end;
  font-weight: bold;
  margin: auto;">${order._id}</div>
    </div>

    <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
      <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;">Order quantity:</div>
      <div style="display: flex;
  flex: 2;
  text-align: center;
  justify-content: flex-end;
  font-weight: bold;
  margin: auto;">${item.quantity}</div>
    </div>

    <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
      <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;">Price:</div>
      <div style="display: flex;
  flex: 2;
  text-align: center;
  justify-content: flex-end;
  font-weight: bold;
  margin: auto;">${item.price.toFixed(2)} HUF</div>
    </div>
    `
    )
    // .join('\n')
  }
    <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
      <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;">Items Price: </div>
      <div style="display: flex;
  flex: 2;
  text-align: center;
  justify-content: flex-end;
  font-weight: bold;
  margin: auto;">${order.itemsPrice.toFixed(2)} HUF</div>
    </div>

    <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
      <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;">Shipping Price:</div>
      <div style="display: flex;
  flex: 2;
  text-align: center;
  justify-content: flex-end;
  font-weight: bold;
  margin: auto;">${order.shippingPrice.toFixed(2)} HUF</div>
    </div>

    <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
      <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;"> <strong>Total Price:</strong> </div>
      <div style="display: flex;
  flex: 2;
  text-align: center;
  justify-content: flex-end;
  font-weight: bold;
  margin: auto;">${order.totalPrice.toFixed(2)} HUF</div>
    </div>

    <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
      <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;"> Payment Method: </div>
      <div style="display: flex;
  flex: 2;
  text-align: center;
  justify-content: flex-end;
  font-weight: bold;
  margin: auto;">${order.paymentMethod}</div>
    </div>

  

    <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
      <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;"> <b>Shipping address</b> </div>
     
    </div>


    <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
    <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;"> Name: </div>
    <div style="display: flex;
  flex: 2;
  text-align: center;
  justify-content: flex-end;
  font-weight: bold;
  margin: auto;">${order.shippingAddress.fullName} </div>
  </div>
  <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
      <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;"> Address: </div>
      <div style="display: flex;
  flex: 2;
  text-align: center;
  justify-content: flex-end;
  font-weight: bold;
  margin: auto;">${order.shippingAddress.address} </div>
    </div>
    <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
      <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;"> City: </div>
      <div style="display: flex;
  flex: 2;
  text-align: center;
  justify-content: flex-end;
  font-weight: bold;
  margin: auto;">${order.shippingAddress.city} </div>
    </div>
    <div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
    <div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;"> Country: </div>
    <div style="display: flex;
  flex: 2;
  text-align: center;
  justify-content: flex-end;
  font-weight: bold;
  margin: auto;">${order.shippingAddress.country} </div>
  </div>
  
<div style="display: flex;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgb(220 220 220), 0px 0px 1px rgb(240 240 240);
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;">
<div style="  word-wrap: break-word;
  display: flex;
  flex: 8;
  justify-content: flex-start;"> Postal Code: </div>
<div style="display: flex;
  flex: 2;
  text-align: center;
  justify-content: flex-end;
  font-weight: bold;
  margin: auto;">${order.shippingAddress.postalCode} </div>
</div>
<hr/>
<p>
    Do Not reply to this email - Zalazon.
    </p>

   
    
   
   
    


  </div>
</div>
*/

/* 
<h1>Thanks <b>${order.user.name}</b> for shopping with us</h1>

  <p>
  Hi ${order.user.name},</p>
  <p>We have finished processing your order.</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.quantity}</td>
    <td align="right"> $${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="5">Items Price:</td>
  <td align="right"> ${order.itemsPrice.toFixed(2)} HUF</td>
  </tr>
  <tr>
  <td colspan="5">Shipping Price:</td>
  <td align="right"> ${order.shippingPrice.toFixed(2)} HUF</td>
  </tr>
  <tr>
  <td colspan="5"><strong>Total Price:</strong></td>
  <td align="right"><strong> ${order.totalPrice.toFixed(2)} HUF</strong></td>
  </tr>
  <tr>
  <td colspan="5">Payment Method:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  
  <h2>Shipping address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Thanks for shopping with us.
  </p> 
*/
