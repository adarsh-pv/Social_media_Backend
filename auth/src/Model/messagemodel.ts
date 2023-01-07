import mongoose, { model, Schema } from "mongoose";


interface Imessage {
    ChatId :{type:mongoose.Types.ObjectId},
    SenderId:{type:mongoose.Types.ObjectId},
    text:{type:string}
}
const messageSchema = new Schema<Imessage>({
     ChatId:{type:mongoose.Types.ObjectId},
     SenderId:{type:mongoose.Types.ObjectId},
     text:{type:String}
},
{timestamps:true})

const Message = model<Imessage>("Message",messageSchema)
 
export const addMessages = async (body:any) =>{
    return await new Message ({
        ChatId:body.data.ChatId,
        SenderId:body.data.SenderId,
        text:body.data.text
    }).save()
}
export const getMessage = async (body:any) =>{
    console.log(body,"hkjjk")
    const { ChatId } = body
    console.log(body)
   return  await Message.find({ChatId:body})


}


export default Message;