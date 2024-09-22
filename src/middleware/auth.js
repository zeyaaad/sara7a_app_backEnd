import  jwt, { decode }  from 'jsonwebtoken';


export const auth=async(req,res,next)=>{
    let token= req.header("token");
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err) return res.status(400).json({message:"invaild token",err})
        req.body.userId=decoded.id
    next()
    })
}