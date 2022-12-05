import   {Router , json }  from "express";
import { login, signup , sendVerify } from "../controller/Authentication";
import cors from "cors";
import { userAuth} from "../middlewares/authentication";
const route = Router()
route.use(json())
route.use(cors())

route.post('/register',signup)
route.post('/login',login)
route.get('/verify',userAuth,sendVerify)    
export default route