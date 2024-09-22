import express from "express"
import { addOrder } from "./order.controller.js"
import { auth } from "../../middleware/auth.js"
import { valdation } from "../../middleware/valdation.js"
import { orderSchema } from "./order.valdatior.js"

let orderRoutes=express.Router()




orderRoutes.post("/add",auth,valdation(orderSchema),addOrder)






export default orderRoutes