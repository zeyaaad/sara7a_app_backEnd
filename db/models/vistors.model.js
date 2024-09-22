import  mongoose, { Types } from 'mongoose';


const vistorSchema= new mongoose.Schema({
    vistorId:{
        type:Types.ObjectId,
        ref:"User"
    },
    profileId:{
        type:Types.ObjectId,
        ref:"User"
    },
},{
    timestamps:true
})


export const vistorModel=mongoose.model("Vistor",vistorSchema);