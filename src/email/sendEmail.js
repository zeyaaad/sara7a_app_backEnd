import nodemailer from "nodemailer";
import { EmailTamplate } from './EmailTamplate.js';


export async function SendEmail(data){


const transporter = nodemailer.createTransport({
    service:"gmail",
  auth: {
    user: "zeyad14112006@gmail.com",
    pass: "qqabfdxdxnoebibt",
  },
});





  const info = await transporter.sendMail({
    from: ' "Sara7a plus App"', // sender address
    to: data.email, // list of receivers
    subject: "Sara7a plus App", // Subject line
    text: "Hello world111", // plain text body
    html: EmailTamplate(data.api,data.email), // html body
  });




}