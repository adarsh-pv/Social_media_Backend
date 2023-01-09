
import { Socket,Server } from "socket.io";
export default function socket({io}:{io:Server}){
    console.log("socket enabled")

let activeUser: any[] = []

io.on("connection", (socket:any)=>{ 
    socket.on('new-user-add',(newUserId:any)=>{
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
}