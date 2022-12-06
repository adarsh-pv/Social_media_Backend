import { Request, Response, text } from "express";
import { ObjectId } from "mongoose";
import { likecount, Likepost, viewall } from "../model/postmodel";
import PostModel from "../model/postmodel";

export const createPost = async (req: Request, res: Response) => {
  console.log("first");
  const { caption, image } = req.body.body;
  console.log(caption, image, "caption and image");
  console.log(req.body.user, "ddd");
  const { id } = req.body.user;
  const Post = new PostModel({
    caption,
    image,
    userid: id,
  })
    .save()
    .then((data) => {
      res.status(201).send({ success: true, data: data });
    });
};
export const showPost = async (req: Request, res: Response) => {
  const response = await viewall();
  console.log(response, "post is herer");
  res.status(200).send(response);
};

export const likepost = async (req:Request, res:Response) =>{
  console.log(req.body.body,"bodyyyyyyyyy")
  const response = await Likepost(req.body)
  const count = await likecount(req.body)

  if(response?.message === "Liked sucessfully"){
    return res.status(200).json({response,count})
  }
  if(response?.message === "Un liked sucessfully"){
    return res.status(200).json({response,count})
   }
  }
  export const commentpost = async (req:Request, res:Response) =>{
    console.log("first")
  }