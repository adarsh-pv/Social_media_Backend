import { json, Router } from "express"
import cors from "cors";
import {  adminLogin, adminSignup, Adminverify, blockUser, findalluser } from "../controller/admin";
import { adminAuth } from "../middlewares/Adminauthentication";
import route from "./userRoutrer";
import { searchdata } from "../controller/Profile";


const router = Router()
router.use(json())
router.use(cors())
// router.post('/',adminSignup)
router.post('/', adminLogin)
router.get('/verify',adminAuth,Adminverify)
router.put('/findusers',findalluser)
router.patch('/blockUser',blockUser)
router.put('/Searchbar',searchdata)


export default router;