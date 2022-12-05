import  express   from "express";
import { json } from "express";
import dotenv from 'dotenv'
dotenv.config({})
import { createUser } from "./Model/userModel";
import {userLogin } from "./Model/userModel"
import cors  from 'cors'
import Mongoose from "./Model/mongoConnection";
import { signToken } from "./controller/Authentication";
import cookieparser from 'cookie-parser'
// import cookieSession from "cookie-session";
import  userRoutes from './Router/userRoutrer'
 const connection = Mongoose.Connection
const app = express();
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(json())
app.use(cookieparser())
app.use('/',userRoutes)
app.listen(4000, ()=>{
    console.log("Runninig in 4000 server")
});
