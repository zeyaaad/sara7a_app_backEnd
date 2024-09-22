import { userModel } from "../../../db/models/user.model.js";
import { SendEmail } from "../../email/sendEmail.js";
import { SendNotifaction } from "../../email/sendnNito.js";
import { AppError } from "../../utils/appError.js";
import { messageModel } from './../../../db/models/messages.model.js';
import { handelAsyncError } from './../../middleware/handelAsyncError.js';



export const addmessage= handelAsyncError(async(req,res,next)=>{
        let {messageText,recievedId,seenderId}=req.body;
        let exsit=await userModel.findById(recievedId);
        if(!exsit) return next(new AppError("User Not Found",400));
        if(exsit.status==0){
            return next(new AppError("You Can't Send messages To this user in this time" ,401))
            }
        if(seenderId){
            let exist2=await userModel.findById(seenderId); 
            if(!exist2) return next(new AppError("Seender Id not Found",400));
            await messageModel.insertMany({messageText,recievedId,seenderId});
        } else {
            if(exsit.typeSend==0){
                await messageModel.insertMany({messageText,recievedId});
            } else {
                return next(new AppError("You must be Registred to send message for this user" , 401))
            }
            
        }
        if(exsit.allowNoti==1){
            await SendNotifaction(exsit.email);
        }
        res.status(201).json({message:"success"})
    


}
)


export const getMessages=async (req,res)=>{
    let messages=await messageModel.find({recievedId:req.body.userId}).select("-seenderId -__v -updatedAt")
    await messageModel.updateMany({recievedId:req.body.userId},{seen:1});
    res.json({message:"success",data:messages});
}
export const getGeneralMessage=async (req,res)=>{
    let messages=await messageModel.find({recievedId:req.params.id,type:1}).select("-fav -type -seen  -seenderId -__v -updatedAt")
    res.json({message:"success",data:messages});
}
export const getFavMessages=async (req,res)=>{
    let messages=await messageModel.find({recievedId:req.body.userId,fav:1}).select("-seenderId -__v -updatedAt")
    res.json({message:"success",data:messages});
}

export const getsendMessages=async (req,res)=>{
    let messages=await messageModel.find({seenderId:req.body.userId}).select("-type -fav -updatedAt -__v ").populate("recievedId","name _id");
    res.json({message:"success",data:messages});
}


export const deleteMessage= handelAsyncError(async(req,res,next)=>{
        let {userId,messageId}=req.body;
        let exsit=await userModel.findById(userId);
        if(!exsit) return next(new AppError("User Not Found",404));
        let exsit2=await messageModel.findById(messageId);
        if(!exsit2) return next(new AppError("Message Not Found",404));
        
        let isAble=await messageModel.findOneAndDelete({_id:messageId,recievedId:userId})
        if(isAble){
            res.json({message:"success"})
        } else {
            return next(new AppError("Unauthorized",401));
        }
}
)
export const makeGeneral= handelAsyncError(async(req,res,next)=>{
        let {userId,messageId}=req.body;
        let exsit=await userModel.findById(userId);
        if(!exsit) return next(new AppError("User Not Found",404));
        let exsit2=await messageModel.findById(messageId);
        if(!exsit2) return next(new AppError("Message Not Found",404));
        
        let isAble=await messageModel.findOneAndUpdate({_id:messageId,recievedId:userId},{type:1})
        if(isAble){
            res.json({message:"success"})
        } else {
            return next(new AppError("Unauthorized",401));
        }
}
)
export const makePrivate= handelAsyncError(async(req,res,next)=>{
        let {userId,messageId}=req.body;
        let exsit=await userModel.findById(userId);
        if(!exsit) return next(new AppError("User Not Found",404));
        let exsit2=await messageModel.findById(messageId);
        if(!exsit2) return next(new AppError("Message Not Found",404));
        
        let isAble=await messageModel.findOneAndUpdate({_id:messageId,recievedId:userId},{type:0})
        if(isAble){
            res.json({message:"success"})
        } else {
            return next(new AppError("Unauthorized",401));
        }
}
)
export const addTofav= handelAsyncError(async(req,res,next)=>{
        let {userId,messageId}=req.body;
        let exsit=await userModel.findById(userId);
        if(!exsit) return next(new AppError("User Not Found",404));
        let exsit2=await messageModel.findById(messageId);
        if(!exsit2) return next(new AppError("Message Not Found",404));
        
        let isAble=await messageModel.findOneAndUpdate({_id:messageId,recievedId:userId},{fav:1})
        if(isAble){
            res.json({message:"success"})
        } else {
            return next(new AppError("Unauthorized",401));
        }
}
)


export const removeFromFav= handelAsyncError(async(req,res,next)=>{
        let {userId,messageId}=req.body;
        let exsit=await userModel.findById(userId);
        if(!exsit) return next(new AppError("User Not Found",404));
        let exsit2=await messageModel.findById(messageId);
        if(!exsit2) return next(new AppError("Message Not Found",404));
        
        let isAble=await messageModel.findOneAndUpdate({_id:messageId,recievedId:userId},{fav:0})
        if(isAble){
            res.json({message:"success"})
        } else {
            return next(new AppError("Unauthorized",401));
        }
})


export const getMessageSeender= handelAsyncError(async(req,res,next)=>{
        let {userId,messageId}=req.body;
        let exsit=await userModel.findById(userId);
        
        if(!exsit) return next(new AppError("User Not Found", ));
        if(exsit.type!="pro"){
           return next(new AppError("Must To upgrade Your Account to makt this action",401))
        }
        let exsit2=await messageModel.findById(messageId);
        if(!exsit2) return next(new AppError("Message Not Found",404));
        if(exsit2.seenderId){
            let seenderData=await userModel.findById(exsit2.seenderId).select("name _id bio gender")

            res.json({message:"success",data:seenderData })
        }else {
            res.json({message:"No seender"})
        }
})


// export const seenMessage= handelAsyncError(async(userId)=>{
//         await messageModel.updateMany({recievedId:userId},{seen:1});
//         res.json({message:"success"})
        
// })








// forget password -> Done , done  


// change password -> Done 
// change name , bio , gender (token) -> Done
// search about users names  -> Done
// contact page for send messages (user_id , messageText , timestamp ) ->Done
// change [who can send me(all or only registerd)] -> Done
// allow notifaction when one send you or not -> Done 

// applay for bro Account  
// show who send me 
// get the number of vistors 



