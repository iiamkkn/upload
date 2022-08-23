import nodemailer from 'nodemailer';

//  This is for For sending forget password
export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

export default sendEmail;

// export const sendEmail = async (email, subject, text) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.HOST,
//       service: process.env.SERVICE,
//       port: Number(process.env.EMAIL_PORT),
//       secure: Boolean(process.env.SECURE),
//       auth: {
//         user: process.env.USER,
//         pass: process.env.PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.USER,
//       to: email,
//       subject: subject,
//       text: text,
//     });
//     console.log('email sent successfully');
//   } catch (error) {
//     console.log('email not sent!');
//     console.log(error);
//     return error;
//   }
// };

// export default sendEmail;
