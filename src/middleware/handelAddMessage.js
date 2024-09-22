import  jwt, { decode }  from 'jsonwebtoken';


export const handelAddMessage=async(req,res,next)=>{
    let token= req.header("token");
    if(token){
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err) return res.status(400).json({message:"invaild seender token",err})
        req.body.seenderId=decoded.id
        next()
    })
    } else {
        next()
    }
   
}