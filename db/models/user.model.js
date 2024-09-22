import  mongoose from 'mongoose';


const userSchema= new mongoose.Schema({
    name: {
    type: String,
    required: true,
    minLength: [3, 'Name must be at least 3 characters long'],
    maxLength: [50, 'Name cannot be more than 50 characters long']
  },
    email:{ type: String, required: true, unique: true },
    password:String,
    verfied:{
        type:Boolean,
        default:false
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
  },
  resetToken:String,
  resetTokenExpiration:Date,
  type:{
     type: String,
    enum: ['user', 'pro'],
    default: 'user'
  },
  bio:String,
  typeSend:{
     type: Number,
    enum: [0,1], // 0-> all  , 1-> only registerd
    default: 0
  },
  allowNoti:{
    type: Number,
    enum: [0,1], // 0-> not allow when recievd  , 1-> allow
    default: 0
  },
  status:{
     type: Number,
    enum: [0,1], // 0-> not revie messages  , 1-> allow 
    default: 1
  },
  vistors:[String]
},{
    timeseries:true
})


export const userModel=mongoose.model("User",userSchema);
