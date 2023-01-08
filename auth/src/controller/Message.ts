import { Request, Response } from "express";
import { addMessages, getMessage } from "../Model/messagemodel";

export const addMessage = async (req: Request, res: Response) => {
  try {
    const response = await addMessages(req.body);
    console.log(response, "res");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getMessages = async (req: Request, res: Response) => {
  try {
    console.log(req.params, "idddddd");
    const response = await getMessage(req.params.ChatId);
    console.log(response, "ppooppoopo");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
