import { Request, Response, text } from "express";
import mongoose, { ObjectId } from "mongoose";
import {
  Likepost,
  viewall,
  docomment,
  commentedUsers,
  showmyposts,
  savedposts,
  fetchsaveitems,
  movetotrash,
  shareposts,
  reportpost,
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
  const response = await viewall(req.body.user.id);
  const userid = req.body.user.id;
  const isliked = await response.map((posts) => {
    if (posts.reactions.includes(userid)) {
      posts.isliked = true;
    }
    if (posts.saved.includes(userid)) {
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
  const response = await showmyposts(req.body.id);
  console.log(response, "my posts");
  res.status(200).json(response);
};
export const saved = async (req: Request, res: Response) => {
  const response = await savedposts(req.body);
  res.status(200).json(response);
};
export const fetchsavedpost = async (req: Request, res: Response) => {
  const response = await fetchsaveitems(req.body);
  res.status(200).json(response);
};
export const trash = async (req: Request, res: Response) => {
  try {
    const response = await movetotrash(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const sharepost = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const respone = await shareposts(req.body.postid);
    res.status(200).json(respone);
  } catch (error) {
    console.log(error);
  }
};
export const reporting = async (req: Request, res: Response) => {
  const userid = req.body.user.id;
  const post = req.body.postid;
  const response = await reportpost(userid, post);
  res.status(200).json(response);
};
export const fetchreportedPosts = async (req: Request, res: Response) => {
  try {
    // const posts = await PostModel.find({},status:false})

    const posts = await PostModel.aggregate([
      {
        $match: {
          status: false,
          reportedusers: { $exists: true, $ne: [] },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          _id:1,
          user: 1,
          createdAt: 1,
          image: 1,
          caption: 1,
          reportedusers: 1,
        },
      },
    ]);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};
