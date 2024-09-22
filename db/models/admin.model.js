import  mongoose, { Types } from 'mongoose';


const adminSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String 
},{
    timestamps:true
})


export const adminModel=mongoose.model("Admin",adminSchema);