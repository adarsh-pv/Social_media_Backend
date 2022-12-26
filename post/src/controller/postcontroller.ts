import { Request, Response, text } from "express";
import { ObjectId } from "mongoose";
import {
  Likepost,
  viewall,
  docomment,
  commentedUsers,
  showmyposts,
  savedposts,
  fetchsaveitems,
} from "../Model/postmodel";
import PostModel from "../Model/postmodel";

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
  console.log("first");
  const response = await viewall();
  const userid = req.body.user.id;
  console.log(response, "ressssssss");
  const isliked = await response.map((posts) => {
    if (posts.reactions.includes(userid)) {
      posts.isliked = true;
    }
    if(posts.saved.includes(userid)){
      posts.isSaved = true;
    }
    return posts;
  });
  console.log(isliked, "isliked");
  res.status(200).send(isliked);
};

export const commentedusers = async (req: Request, res: Response) => {
  const postid = req.body.body;
  const comment = await commentedUsers(postid);
  console.log(comment, ">>>>>>>>>>>>>");
  res.status(200).send(comment);
};

export const likepost = async (req: Request, res: Response) => {
  console.log(req.body, "bodydyyy");
  const response = await Likepost(req.body);
  return res.status(200).json({ response });
};
export const Commentpost = async (req: Request, res: Response) => {
  const response = await docomment(req.body);
};
export const showmyphoto = async (req: Request, res: Response) => {
  const response = await showmyposts(req.body);
  res.status(200).json(response);
};
export const saved = async (req:Request,res:Response) =>{
  const response = await savedposts (req.body)
  res.status(200).json(response)
}
export const fetchsavedpost = async (req:Request,res:Response) =>{
  const response = await fetchsaveitems(req.body)
  console.log(response,"uuu")
}
