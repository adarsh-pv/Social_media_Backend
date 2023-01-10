import  express   from "express";
import { json } from "express";
import dotenv, { config } from 'dotenv'
import {createServer} from 'http'
dotenv.config({})
import cors  from 'cors'
import socket from "./Socket"
import Mongoose from "./Models/mongoConnection";
import cookieparser from 'cookie-parser'
import connectus from './Rabitmq/rabitmq'
import Adminrouter from "./Router/adminRouter";
import {Socket,Server} from 'socket.io'
// import cookieSession from "cookie-session";
import  userRoutes from './Router/userRoutrer'
import chatRoutes from './Router/chatRouter'
import messageRoutes from  './Router/messageRouter'
const app = express();
const origin =['http://localhost:3000','https://socialmedia-370608.web.app']
app.use(cors({credentials:true,origin:origin}))
app.use(json())
app.use(cookieparser())
app.use('/',userRoutes)
app.use('/chat',chatRoutes)
app.use('/message',messageRoutes)
app.use('/admin',Adminrouter)

const connection = Mongoose.connection;
// connectus().then((channel)=>{
// app.listen(4000, ()=>{
// console.log("Running in 4000 server")
//     });
// })   
const httpServer = createServer(app)

const io =  new Server (httpServer,{cors:{
    origin:origin,credentials:true
   }})
    httpServer.listen(4000,()=>{
           socket({io})
  
      console.log("listening to 4000 port");
    })
  

  

