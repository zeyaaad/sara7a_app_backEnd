
export const globalError=(err,req,res,next)=>{
    if(process.env.MODE=="dev"){
        res.status(err.statusCode).json({err:err.message,ref:err.stack})
    }else {
        res.json({err:err.message})
    }
}