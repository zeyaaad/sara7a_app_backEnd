import { AppError } from "../utils/appError.js"


export function valdation(schema,type){
    return (req,res,next)=>{
        let {error}=schema.validate(req[type],{abortEarly:false})
        if(!error){
            next()
        }else {
            return next(new AppError(error,400))
        }
    }
}