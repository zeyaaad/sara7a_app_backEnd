
import jwt from 'jsonwebtoken';
import { userModel } from './../../../db/models/user.model.js';
import bcrypt from "bcrypt"
import { SendEmail } from '../../email/sendEmail.js';
import { handelAsyncError } from './../../middleware/handelAsyncError.js';
import { AppError } from './../../utils/appError.js';
import { SendResetEmail } from '../../email/sendResetEmail.js';



export const register=handelAsyncError(async(req,res,next)=>{
    let {name,email,password,gender}=req.body;
    let exist=await userModel.findOne({email});
    if(exist) return next(new AppError("User Already Exist",409));
    let hashpass=await bcrypt.hash(password,Number(process.env.ROUNDED));
    let inserted=await userModel.insertMany({name,email,password:hashpass,gender});
    let token = jwt.sign({id:inserted[0]._id},process.env.SECRET_KEY)
    let data={email:email ,
        api:`${process.env.FRONT_URL}/verify/${token}`
    }
    let user=await userModel.findById(inserted[0]._id)
    user.verifyToken=token;
    await user.save()
    await SendEmail(data)
    return res.json({message:"success"})
})

export const logIn=handelAsyncError(async(req,res,next)=>{
    let {email,password}=req.body;
    let exist=await userModel.findOne({email});
    if(exist){
            if(exist.verfied){
                let matched= bcrypt.compareSync(password,exist.password);
                if(matched){
                    let token= jwt.sign({name:exist.name,id:exist._id},process.env.SECRET_KEY);
                    res.json({message:"success",token:token})
                } else {
                   return next(new AppError("Wrong Password",400)) 
                }
            } else {
                return next(new AppError("Verfied Your Email first To log in",401)) 
            }
        }else {
            return next(new AppError("Email Not Found",400)) 
    }
})


export const verify=async(req,res)=>{
    let {token}=req.params;
    let exist=await userModel.findOne({verifyToken:token})
    if(!exist) return res.json({message:"Invaild token"})
    exist.verfied=true 
    exist.verifyToken=null;
    await exist.save()
    res.json({message:"success"})
 
}

export const protectRoute=(req,res)=>{
    let {token}=req.params;
    jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
        if(err) return res.json({status:false })
        res.json({status:true})
    })
}


export const checkUser=handelAsyncError(async (req,res,next)=>{
    let {userId}=req.params ;
    let user =await userModel.findById(userId).select(" -password -verfied -vistors -type -gender -allowNoti -email -__v  ");
    if(!user) return  next(new AppError("User Not Found",404))   
    res.json({message:"success" , user})  

})








export const forgetPassword=handelAsyncError(async(req,res)=>{
    const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; 
    await user.save();

    await SendResetEmail({email:email,token:resetToken})

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
})



export const resetPassword = handelAsyncError(async (req, res) => {
    const token = req.header("token"); 
    const { newPassword } = req.body;
    
    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

        const user = await userModel.findOne({
            _id: decodedToken.userId,
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.ROUNDED, 10));

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        console.error(error); 
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});

export const checkResetToken = handelAsyncError(async (req, res) => {
    const token = req.header("token"); 

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

        const user = await userModel.findOne({
            _id: decodedToken.userId,
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }


        res.status(200).json({ message: true });
    } catch (error) {
        console.error(error); 
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});



export const changeData=handelAsyncError(async(req,res,next)=>{
    let {userId,name,bio,gender}=req.body;
    let user=await userModel.findById(userId)
    if(user){
            if(user.verfied){
                user.name=name ;
                user.bio=bio;
                user.gender=gender;
                await user.save()
                res.json({message:"success"})

            } else {
                return next(new AppError("Verfied Your Email first",401)) 
            }
        }else {
            return next(new AppError("User Not Found",400)) 
    }
})


export const changePassword=handelAsyncError(async(req,res,next)=>{
    let {userId,currentPassword,password}=req.body;
    let user=await userModel.findById(userId)
    if(user){
            if(user.verfied){
               let matched= bcrypt.compareSync(currentPassword,user.password);
                if(matched){
                    let hashedPass=await bcrypt.hash(password,Number(process.env.ROUNDED))
                     user.password=hashedPass;
                    await user.save()
                    res.json({message:"success"})
                } else {
                   return next(new AppError("Wrong Current Password",400)) 
                }

            } else {
                return next(new AppError("Verfied Your Email first",401)) 
            }
        }else {
            return next(new AppError("User Not Found",400)) 
    }
})
export const SearchUsers=handelAsyncError(async(req,res,next)=>{
    let {name}=req.params;
      const users = await userModel.find({
    name: new RegExp(`^${name}`, 'i') 
  }).select("name _id bio ");

  res.json({message:"success",data:users})

})
export const changeTypeSend=handelAsyncError(async(req,res,next)=>{
    let {userId,typeSend}=req.body

    let user=await userModel.findById(userId);
    if(user){
        user.typeSend=typeSend
        await user.save()
        return res.json({message:"success"})
    } else {
        next(new AppError("User Not Found",404))
    }
 
  

})


export const changeNoti=handelAsyncError(async(req,res,next)=>{
    let {userId,allowNoti}=req.body

    let user=await userModel.findById(userId);
    if(user){
        user.allowNoti=allowNoti
        await user.save()
        return res.json({message:"success"})
    } else {
        next(new AppError("User Not Found",404))
    }

})
export const chnageStatus=handelAsyncError(async(req,res,next)=>{
    let {userId,status}=req.body

    let user=await userModel.findById(userId);
    if(user){
        user.status=status
        await user.save()
        return res.json({message:"success"})
    } else {
        next(new AppError("User Not Found",404))
    }

})



export const getAlldata=handelAsyncError(async(req,res,next)=>{
    let {userId}=req.body

    let user=await userModel.findById(userId).select("-password -vistors -verfied -__v ");
    if(user){
        return res.json({message:"success",data:user})
    } else {
        next(new AppError("User Not Found",404))
    }
 
  })






// delete => reciveID , messagid , in headers(token)
