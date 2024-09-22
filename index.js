import dotenv from "dotenv"
dotenv.config({});


import express from 'express'
import cors from 'cors';
import { connection } from './db/connection.js';
import userRoutes from './src/modules/User/user.routes.js';
import messageRoutes from './src/modules/Message/message.routes.js';
import { AppError } from './src/utils/appError.js';
import { globalError } from "./src/utils/globalError.js";
import contactRoutes from "./src/modules/Contact/contact.routes.js";
import orderRoutes from "./src/modules/Order/order.routes.js";
import adminRoutes from "./src/modules/Admin/admin.routes.js";
import vistorRoutes from "./src/modules/Vistor/vistor.routes.js";
import compression from "compression";


const app = express()
const port = process.env.PORT||3000
app.use(cors())
app.use(compression())
connection()

app.use(express.json())
app.use("/api/v1/user/",userRoutes)
app.use("/api/v1/message/",messageRoutes)
app.use("/api/v1/contact/",contactRoutes)
app.use("/api/v1/order/",orderRoutes)
app.use("/api/v1/admin/",adminRoutes)
app.use("/api/v1/vistor/",vistorRoutes)

app.use("*",(req,res,next)=>{
    next(new AppError("Invalid URL",404))
})
 
app.use(globalError)




app.listen(port, () => console.log(` app listening on port ${port}!`))