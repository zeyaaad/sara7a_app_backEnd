import express from "express";
import { logIn, register,verify,protectRoute
    ,checkUser,forgetPassword,resetPassword,
    checkResetToken,changeData,changePassword
    ,SearchUsers ,changeTypeSend,changeNoti,getAlldata,chnageStatus

} from "./user.controller.js";
import { valdation } from "../../middleware/valdation.js";
import { loginSchema, registerSchema, userSchema
    ,changeDataSchema,changePasswordSchema,SearchSchema,
     schemaWhoCanSend, shcemaNoti, shcemaStatus} from './user.valdatior.js';
import { auth } from "../../middleware/auth.js";

const userRoutes=express.Router();


userRoutes.post("/register",valdation(registerSchema,"body"),register);
userRoutes.post("/login",valdation(loginSchema,"body"),logIn);
userRoutes.get("/verify/:token",verify);
userRoutes.get("/protectRoute/:token",protectRoute);
userRoutes.get("/checkUser/:userId",valdation(userSchema,"params"),checkUser);
userRoutes.post("/forgot-password",forgetPassword)
userRoutes.post("/reset-password",resetPassword)
userRoutes.get("/check-resetToken",checkResetToken)
userRoutes.put("/changedata",auth,valdation(changeDataSchema,"body"),changeData) 
userRoutes.put("/changepass",auth,valdation(changePasswordSchema,"body"),changePassword) 
userRoutes.get("/search/:name",auth,valdation(SearchSchema,"params"),SearchUsers) 
userRoutes.put("/changeTypeSend",auth,valdation(schemaWhoCanSend,"body"),changeTypeSend) 
userRoutes.put("/changeTypeNoti",auth,valdation(shcemaNoti,"body"),changeNoti) 
userRoutes.put("/changestatus",auth,valdation(shcemaStatus,"body"),chnageStatus) 
userRoutes.get("/alldata",auth,getAlldata) 


export default userRoutes


