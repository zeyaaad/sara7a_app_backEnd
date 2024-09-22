import { userModel } from '../../../db/models/user.model.js';
import { handelAsyncError } from '../../middleware/handelAsyncError.js';
import { AppError } from '../../utils/appError.js';
import { orderModal } from './../../../db/models/order.model.js';


export const addOrder=handelAsyncError(async(req,res,next)=>{
    let {userId,messageText,why}=req.body 

    let user=await userModel.findById(userId)
    if(!user) return next(new AppError("User Not found",404));
    orderModal.insertMany({userId,messageText:messageText,why:why});
    res.status(201).json({message:"success"})
})
