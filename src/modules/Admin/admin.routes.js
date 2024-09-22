import express from "express"
import { getUsers,getMessages,getOrders,logIn,protectRoute,acceptOrder,noOrder,getUsersPlus,removePro} from "./admin.controller.js";
import { auth } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/isAdmin.js";
import { loginSchema } from "./admin.valdatior.js";
import { valdation } from "../../middleware/valdation.js";

const adminRoutes=express.Router();

adminRoutes.get("/users",auth,isAdmin,getUsers);
adminRoutes.get("/usersplus",auth,isAdmin,getUsersPlus);
adminRoutes.get("/messages",auth,isAdmin,getMessages);
adminRoutes.get("/orders",auth,isAdmin,getOrders);
adminRoutes.post("/login",valdation(loginSchema),logIn)
adminRoutes.get("/protectRoute/:token",protectRoute);
adminRoutes.post("/accsept",auth,isAdmin,acceptOrder)
adminRoutes.post("/no",auth,isAdmin,noOrder)
adminRoutes.post("/removepro",auth,isAdmin,removePro)


export default adminRoutes  


// acc -> userId,messageId,tokne(userId)