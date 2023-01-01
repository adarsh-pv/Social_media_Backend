// import { Socket } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();
const io = require('socket.io')(8800, {
  cors:{
    credentials: true, 
    origin: "http://localhost:3000" 
  }
})

console.log("started at 8800")
let activeUser: any[] = []

io.on("connection", (socket:any)=>{
    socket.on('new-uer-add',(newUserId:any)=>{
        if(!activeUser.some((user)=>{
            user.userId === newUserId
        })){
          activeUser.push({
            userId:newUserId,
            socketId:socket.id
          })
        }  
        console.log("connected users",activeUser)
        io.emit('get-Users',activeUser) 
    })
    socket.on("send-message",(data:any)=>{
      const {receiverId} = data;
      const user = activeUser.find((user)=>user.userId === receiverId)
      console.log("sending from socket to : ",receiverId)
      console.log("Data",data)
      if(user){
        io.to(user.socketId).emit("receive-message",data)
      }
    })
    socket.on("disconnect",()=>{
        activeUser = activeUser.filter((user)=>user.socketId !== socket.id);
        console.log("user Disconnected",activeUser)
        io.emit('get-Users',activeUser)

    })
})

