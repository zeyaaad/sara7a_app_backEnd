import  jwt, { decode }  from 'jsonwebtoken';
import { adminModel } from '../../db/models/admin.model.js';


export const isAdmin=async(req,res,next)=>{
    let {userId}= req.body
    let admin =await adminModel.findById(userId)
    if(admin){
        next()
    } else {
        return res.status(401).json({message:"unathorize"}) 
    }
}