import { Request , Response, text} from 'express';
import { ObjectId } from 'mongoose';
import { viewall } from '../model/postmodel';
import  PostModel  from "../model/postmodel"

export const createPost =async (req:Request , res:Response) =>{
    console.log("first")
    const { caption , image } = req.body.body
    console.log(caption,image,"caption and image")
    console.log(req.body.user,"ddd")
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
export const showPost = async (req:Request,res:Response) =>{
    const response =  await viewall();
    console.log(response,"post is herer")
    res.status(200).send(response)
}


