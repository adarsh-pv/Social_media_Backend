import   {Router , json }  from "express";
import cors from "cors";
import { addMessage, getMessages } from "../controller/Message";
const router = Router()
router.use(json())
router.use(cors())

router.post('/',addMessage)
router.get('/:ChatId',getMessages)


export default router;