import { Router,json} from 'express'
import cors from 'cors'
import { createPost, showPost } from '../controller/postcontroller'
import { verifytoken } from '../middlewares/authenticatioin'


const route = Router()
route.use(json())
route.use(cors())

route.post('/createpost',verifytoken,createPost)
route.get('/allposts',showPost)
// route.get('/verify',verifytoken)

export default route

