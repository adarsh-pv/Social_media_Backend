import mongoose, { model, Schema } from "mongoose";
interface Imessage {
  ChatId: { type: mongoose.Types.ObjectId };
  SenderId: { type: mongoose.Types.ObjectId };
  text: { type: string };
}
const messageSchema = new Schema<Imessage>(
  {
    ChatId: { type: mongoose.Types.ObjectId },
    SenderId: { type: mongoose.Types.ObjectId },
    text: { type: String },
  },
  { timestamps: true }
);

const Message = model<Imessage>("Message", messageSchema);

export const addMessages = async (body: any) => {
  try {
    return await new Message({
      ChatId: body.data.ChatId,
      SenderId: body.data.SenderId,
      text: body.data.text,
    }).save();
  } catch (error) {
    console.log(error);
  }
};
export const getMessage = async (body: any) => {
  try {
    console.log(body, "hkjjk");
    const { ChatId } = body;
    console.log(body);
    return await Message.find({ ChatId: body });
  } catch (error) {
    console.log(error);
  }
};

export default Message;
