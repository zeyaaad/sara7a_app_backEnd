import  express  from 'express';
import { addVistor,getAllVistors,getNumberOfVistors } from './vistor.controller.js';
import { auth } from '../../middleware/auth.js';
import { valdation } from '../../middleware/valdation.js';
import { addVistorShcema,getVistorShcema } from './vistor.valdator.js';

const vistorRoutes=express.Router();


vistorRoutes.post("/add",auth,valdation(addVistorShcema,"body"),addVistor)
vistorRoutes.get("/getall",auth,valdation(getVistorShcema,"body"),getAllVistors)
vistorRoutes.get("/getnumber/:userId",valdation(getVistorShcema,"params"),getNumberOfVistors)




export default vistorRoutes