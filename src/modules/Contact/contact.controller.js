
import { handelAsyncError } from './../../middleware/handelAsyncError.js';
import { AppError } from './../../utils/appError.js';
import { contactModel } from './../../../db/models/contact.model.js';
import { userModel } from '../../../db/models/user.model.js';



export const postContact=handelAsyncError(async(req,res,next)=>{
    let {userId,messageText}=req.body 
    let exist=await userModel.findById(userId)
    if(exist){
        let inserted=await contactModel.insertMany({userId,messageText})
        res.status(201).json({message:"success"})
    } else {
        next(new AppError("User Not Found",404))
    }

})