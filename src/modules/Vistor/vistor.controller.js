
import { userModel } from '../../../db/models/user.model.js';
import { vistorModel } from '../../../db/models/vistors.model.js';
import { AppError } from '../../utils/appError.js';
import { handelAsyncError } from './../../middleware/handelAsyncError.js';



export const addVistor=handelAsyncError(async(req,res,next)=>{
    let {userId,profileId}=req.body;
    if(userId==profileId){
        return res.json({message:"same profile"})
    }
    let user1= await userModel.findById(userId);
    let user2= await userModel.findById(profileId);
    if(!user1) return next(new AppError("userId not found",404));
    if(!user2) return next(new AppError("profileId not found",404));

    await vistorModel.deleteMany({vistorId:userId,profileId});
    await vistorModel.insertMany({vistorId:userId,profileId});
    res.status(201).json({message:"success"})
})
export const getAllVistors=handelAsyncError(async(req,res,next)=>{
    let {userId}=req.body;
    let user= await userModel.findById(userId);
    if(!user) return next(new AppError("userId not found",404));
    if(user.type=="pro"){
        let allData=await vistorModel.find({profileId:userId}).populate("vistorId","_id name bio gender");
        res.json({message:"success",data:allData})
    } else {
        return next(new AppError("Un authorize",401))
    }
    
})
export const getNumberOfVistors=handelAsyncError(async(req,res,next)=>{
    let {userId}=req.params;
    let user= await userModel.findById(userId);
    if(!user) return next(new AppError("userId not found",404));
    let allData=await vistorModel.find({profileId:userId});
    res.json({message:"success",data:allData.length});
 
})
