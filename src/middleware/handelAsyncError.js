import { AppError } from "../utils/appError.js"


export function handelAsyncError(fun){
    return (req,res,next)=>{
        fun(req,res,next).catch((err)=>{
            next(new AppError(err.message,500))
        })
    }
}