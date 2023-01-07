import { json, Router } from "express"
import { createChat, findChat, userChats } from "../controller/Chat"
import cors from "cors";
import { userAuth } from "../middlewares/authentication";

const router = Router()
router.use(json())
router.use(cors())

router.post("/Createchat",userAuth,createChat)
router.get('/Createchat/:id',userChats)
router.get('/find/:firstId/:secondId',findChat)

export default router;