import  mongoose, { Types } from 'mongoose';


const contactSchema= new mongoose.Schema({
    messageText:String,
    userId:{
        type:Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})


export  const contactModel=mongoose.model("Contact",contactSchema);
