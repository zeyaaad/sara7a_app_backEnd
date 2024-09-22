import  mongoose, { Types } from 'mongoose';


const messageSchema= new mongoose.Schema({
    messageText:String,
    recievedId:{
        type:Types.ObjectId,
        ref:"User",
    },
    seenderId:{
        type:Types.ObjectId,
        ref:"User"
    },
    type:{
     type: Number,
    enum: [0, 1], // 0=> only me , 1=> all
    default: 0 
  },
    fav:{
     type: Number,
    enum: [0, 1], // 0=> no fav , 1=> fav
    default: 0
  },
  seen:{
    type: Number,
    enum: [0, 1], // 0=> no , 1=> yes
    default: 0
  }
},{
    timestamps:true
})


export  const messageModel=mongoose.model("Message",messageSchema);
