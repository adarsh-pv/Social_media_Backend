import { Response, Request } from "express";
import { Createchates, findchats, userChat } from "../Model/chatModel";

export const createChat = async (req: Request, res: Response) => {
  try {

    const SenderId = req.body.user.id;
    const receiverId = req.body.id;
    const response = await Createchates(SenderId, receiverId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const userChats = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const response = await userChat(req.params.id);
    console.log(response, "ui");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const findChat = async (req: Request, res: Response) => {
  const firstId = req.params.firstId;
  const secondId = req.params.secondId;
  try {
    const response = await findchats(firstId, secondId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
