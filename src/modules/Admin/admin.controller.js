import { adminModel } from "../../../db/models/admin.model.js";
import { contactModel } from "../../../db/models/contact.model.js";
import { orderModal } from "../../../db/models/order.model.js";
import { userModel } from "../../../db/models/user.model.js";
import { ReplayOrder } from "../../email/replayOrder.js";
import { handelAsyncError } from "../../middleware/handelAsyncError.js";
import { AppError } from "../../utils/appError.js";
import jwt from 'jsonwebtoken';


export const getUsers=handelAsyncError(async(req,res)=>{

    let users=await userModel.find().select("name email verfied gender  type bio ");
    res.json({message:"success", data:users})
    
})
export const getUsersPlus=handelAsyncError(async(req,res)=>{

    let users=await userModel.find({type:"pro"}).select("name email verfied gender  type bio ");
    res.json({message:"success", data:users})
    
})


export const getMessages=handelAsyncError(

    async(req,res)=>{
        
        let messages=await contactModel.find().populate("userId","name email type bio gender").select("messageText userId createdAt");
        res.json({message:"success", data:messages})
        
    }
    
)
    


export const getOrders=handelAsyncError(
    async(req,res)=>{
        
        let orders=await orderModal.find().populate("userId","name email type bio gender").select("messageText userId why createdAt");
        res.json({message:"success", data:orders})
        
    }

    )

export const logIn =handelAsyncError(async(req,res,next)=>{
    let {email,password}=req.body;
    let user=await adminModel.findOne({email});
    if(!user) return next( new AppError("Wrong email or password ",400));
    if(user.password===password){
        let token= jwt.sign({name:user.name,id:user._id},process.env.SECRET_KEY);
        res.json({message:"success",token:token})

    } else {
        
    return next( new AppError("Wrong email or password ",400));
    }
})

export const protectRoute=handelAsyncError(async(req,res)=>{
        let {token}=req.params;
        jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
            if(err) return res.json({status:false })
            let admin=await adminModel.findById(decoded.id)
    if(!admin) return res.json({status:false})
        res.json({status:true})
    })
}

)
export const acceptOrder=handelAsyncError(async(req,res,next)=>{
   
    let{orderId,profileId}=req.body
    let profile=await userModel.findById(profileId)
    let order=await orderModal.findById(orderId)
    if(!profile) return next(new AppError("profile Not Found",404))
    if(!order) return next(new AppError("order Not Found",404))
    profile.type="pro";
    await profile.save();
    await ReplayOrder(profile.email,"Congratulations, we have accepted your request for the Sara7a Plus feature.")
    await orderModal.deleteOne({_id:orderId});
    res.json({message:"success"});

}
)
export const noOrder=handelAsyncError(async(req,res,next)=>{
   
    let{orderId,profileId}=req.body
    let profile=await userModel.findById(profileId)
    let order=await orderModal.findById(orderId)
    if(!profile) return next(new AppError("profile Not Found",404))
    if(!order) return next(new AppError("order Not Found",404))
    profile.type="user";
    await profile.save();
    await ReplayOrder(profile.email,"Unfortunately, we have declined your request for the Sara7a Plus feature.")
    await orderModal.deleteOne({_id:orderId});
    res.json({message:"success"});
    
}
)
export const removePro=handelAsyncError(async(req,res,next)=>{
   
    let{profileId}=req.body
    let profile=await userModel.findById(profileId)
    if(!profile) return next(new AppError("profile Not Found",404))
    profile.type="user";
    await profile.save();
    res.json({message:"success"});
    
}
)









/* vistorModel {
    _id,
    vistorId ,
    profileId,
    Time,   
    
} */

