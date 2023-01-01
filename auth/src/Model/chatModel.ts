import mongoose, { model, ObjectId, Schema } from "mongoose";


interface IChat {
    members:[{type:mongoose.Types.ObjectId}]
}
const ChatSchema = new Schema<IChat>({
    members:{type:[{type:mongoose.Types.ObjectId }]}
},
{timestamps:true})
const Chat = model<IChat>("Chat",ChatSchema)

export const Createchates = async (body:any) =>{
    const newaChat = new Chat({
        members:[body.SenderId,body.receiverId]
    })
    return await newaChat.save()
    
}
export const userChat = async (body:any) =>{
    return await Chat.find({
        members:{$in:[body]}
    })
}
export const findchats = async (firstId:any,secondId:any) =>{
    return await Chat.findOne({
        members:{$all:[firstId,secondId]}
    })
}
export default Chat;
