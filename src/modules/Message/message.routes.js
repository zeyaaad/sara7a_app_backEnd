import express from "express";
import { addmessage,deleteMessage 
    ,getMessages,makeGeneral
    ,makePrivate,addTofav,
    removeFromFav,getGeneralMessage,getFavMessages,getsendMessages,getMessageSeender
} from './message.controller.js';
import { auth } from "../../middleware/auth.js";
import { valdation } from "../../middleware/valdation.js";
import { addMessageSchema,mainMessageSchema,seenSchema } from "./message.valdatior.js";
import { handelAddMessage } from "../../middleware/handelAddMessage.js";

const messageRoutes=express.Router();


messageRoutes.post("/",handelAddMessage,valdation(addMessageSchema,"body"),addmessage);
messageRoutes.get("/",auth,getMessages)

messageRoutes.delete("/",auth,valdation(mainMessageSchema,"body"),deleteMessage)

messageRoutes.put("/makeGeneral",auth,valdation(mainMessageSchema,"body"),makeGeneral)
messageRoutes.put("/makePrivate",auth,valdation(mainMessageSchema,"body"),makePrivate)
messageRoutes.get("/public/:id",getGeneralMessage)

messageRoutes.post("/fav",auth,valdation(mainMessageSchema,"body"),addTofav)
messageRoutes.delete("/fav",auth,valdation(mainMessageSchema,"body"),removeFromFav)
messageRoutes.get("/fav",auth,getFavMessages)

messageRoutes.post("/messageseender",auth,valdation(mainMessageSchema,"body"),getMessageSeender)

// messageRoutes.post("/seen",auth,valdation(seenSchema,"body"),seenMessage)




messageRoutes.get("/sending",auth,getsendMessages)


export default messageRoutes