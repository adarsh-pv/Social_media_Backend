import { json, Router } from "express"
import cors from "cors";
import {  adminLogin, adminSignup, Adminverify, blockUser, findalluser } from "../Controllers/admin";
import { adminAuth } from "../middlewares/Adminauthentication";
import route from "./userRoutrer";
import { searchdata } from "../Controllers/Profile";


const router = Router()
router.use(json())
router.use(cors())
// router.post('/',adminSignup)
router.post('/', adminLogin)
router.get('/verify',adminAuth,Adminverify)
router.put('/findusers',adminAuth,findalluser)
router.patch('/blockUser',adminAuth,blockUser)
router.put('/Searchbar',adminAuth,searchdata)


export default router;