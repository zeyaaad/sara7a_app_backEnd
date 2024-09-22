import  mongoose, { Types } from 'mongoose';


const orderSchema= new mongoose.Schema({
    messageText:String,         
    userId:{
        type:Types.ObjectId,
        ref:"User"
    },
    why:String
},{
    timestamps:true
})


export  const orderModal=mongoose.model("Order",orderSchema);

