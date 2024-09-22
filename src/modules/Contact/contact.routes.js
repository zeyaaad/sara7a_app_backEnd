import express from "express";
import { postContact } from "./contact.controller.js";
import { valdation } from "../../middleware/valdation.js";
import { contactSchema } from "./contact.valdatior.js";
import { auth } from "../../middleware/auth.js";

const contactRoutes=express.Router();


contactRoutes.post("/add",auth,valdation(contactSchema,"body"),postContact);

export default contactRoutes