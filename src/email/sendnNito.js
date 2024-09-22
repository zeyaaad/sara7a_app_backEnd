import nodemailer from "nodemailer";
import { NotiTemplate } from "./NotiTemplate.js";


export async function  SendNotifaction(email){


const transporter = nodemailer.createTransport({
    service:"gmail",
  auth: {
    user: "zeyad14112006@gmail.com",
    pass: "qqabfdxdxnoebibt",
  },
});





  const info = await transporter.sendMail({
    from: ' "Sara7a plus App"', // sender address
    to: email, // list of receivers
    subject: "New Notifaction", // Subject line
    text: "", // plain text body
    html: NotiTemplate()
  });




}