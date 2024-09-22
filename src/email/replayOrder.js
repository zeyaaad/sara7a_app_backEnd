import nodemailer from "nodemailer";
import { NotiTemplate } from "./NotiTemplate.js";
import { replayTamplate } from "./replayTamplate.js";


export async function  ReplayOrder(email,message){


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
    html: replayTamplate(message)
  });




}