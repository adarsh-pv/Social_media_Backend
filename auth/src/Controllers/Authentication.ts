import Jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { createUser, userLogin } from "../Models/userModel";
import { Request, Response } from "express";

const SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY;
export const signToken = (_id: ObjectId, email: string) => {
  try {
    if (SECRET_KEY) {
      const token = Jwt.sign({ _id, email }, SECRET_KEY, {
        expiresIn: "2 days",
      });
      return token;
    }
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const register:any = await createUser(req.body.body);
    console.log(register)
    if(register?.exist == true){
      const { exist } = register
   return res.status(201).json({exist})
    }
    if (register) {
      const { name, _id, email } = register;
      const token = signToken(register?._id, register?.email);
      return res.status(200).json({_id, name, token });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    type user = {
      _id: ObjectId;
      email: string;
      password: string;
      name: string;
    };
    const response: user = await userLogin(req.body.body);
    if (response?.email) {
      const { _id, email, name } = response;
      const token = signToken(_id, email);
      return res.status(201).json({ token, name, _id });
    } else {
      return res.send(response);
    }
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const sendVerify = async (req: Request, res: Response) => {
  try {
    return res.send(req.body.user);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
