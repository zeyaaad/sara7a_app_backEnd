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
    to: data.email, 
    from: ' "Sara7a plus App"', 
    subject: "Sara7a plus App", 
    html: "<h1> Hamada Email </h1>", 
  });




}
