import nodemailer from "nodemailer";
import { ResetPass } from "./RestpassTamplate.js";


export async function  SendResetEmail(data){


const transporter = nodemailer.createTransport({
    service:"gmail",
  auth: {
    user: "zeyad14112006@gmail.com",
    pass: "qqabfdxdxnoebibt",
  },
});





  const info =  await transporter.sendMail({
      to: data.email,
      from: "Sara7a Plus App",
      subject: 'Password Reset',
      html: ResetPass(data.token)
    });




}