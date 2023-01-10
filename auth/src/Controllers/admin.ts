import { Response, Request } from "express";
import { ObjectId } from "mongoose";
import Jwt, { verify } from "jsonwebtoken";
import { createAdmin, verifyadmin, veriify } from "../Models/adminModel";
import User, {
  alluserslist,
  block,
  findallusers,
  usersprofile,
} from "../Models/userModel";

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
export const adminSignup = async (req: Request, res: Response) => {
  try {
    const name = req.body.body.name;
    const email = req.body.body.email;
    const password = req.body.body.password;
    const response = await createAdmin(name, email, password);
    console.log(response);
    if (response) {
      const token = signToken(response?._id, response?.email);
      res.status(201).json({ token });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const response = await veriify(req.body.body);
    if (response.email) {
      const { _id, email, name } = response;
      const token = signToken(_id, email);
      return res.status(201).json({ token, name, _id });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const findalluser = async (req: Request, res: Response) => {
  try {
    const page = req.query.page;
    const item_perPage = 5;
    const TotalUsers = await User.find().countDocuments();
    if (typeof page === "string") {
      {
        const response = await alluserslist(parseInt(page), item_perPage);
        res.status(200).json({ response, TotalUsers });
      }
    }
  } catch (error) {
    res.status(403).json(error);
  }
};
export const blockUser = async (req: Request, res: Response) => {
  try {
    const response = await block(req.body.id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const Adminverify = async (req: Request, res: Response) => {
  try {
    const response = await verifyadmin(req.body);
    if (response?.$isValid) {
      res.status(200).json("verified");
    }
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
