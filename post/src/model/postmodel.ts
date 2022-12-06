/* eslint-disable @typescript-eslint/ban-types */
import e from "express";
import mongoose, { model, ObjectId, Schema } from "mongoose";

interface Ipost {
  userid: ObjectId;
  caption: string;
  image: string;
  comments: [{ content: string; userId: ObjectId }];
  reactions: [{ type: string; userId: ObjectId }];
  methods: {
    createPost: () => {};
  };
}
const postSchema = new Schema<Ipost>({
  userid: { type: mongoose.Types.ObjectId },
  caption: { type: String },
  image: { type: String, required: true },
  comments: { type: [{ content: String, userId: mongoose.Types.ObjectId }] },
  reactions: { type: [{ type: String, userId: mongoose.Types.ObjectId }] },
});
postSchema.methods.createPost = async (data: any) => {
  return await mongoose.model("Post").create(data);
};

const PostModel = model<Ipost>("Post", postSchema);

export const createpost = async (data: any) => {
  await PostModel.create(data)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
export const viewall = async () => {
  //  let posts = await PostModel.find().populate('userid')
  //  console.log(posts,"=============")
  return await PostModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userid",
        foreignField: "_id",
        as: "userid",
      },
    },
    {
      $unwind: {
        path: "$userid",
      },
    },
  ]);
};
export const Likepost = async (body:any) =>{
  const id = body.body
  const userid = body.user.id
  if(!id && userid){
    return { message: "all filed are required" };
  }
  try{
    if(!userid){
      return { message:"you are unautharised"}
    }
    if(!id){
      return { message:"You are un authoried"}
    }
    const like = await PostModel.findById(body.body)
     if(!like?.reactions.includes(userid)){
      await like?.updateOne({$push :{reactions:userid}})
      return {liked:true, message:"Liked sucessfully"}
     } 
     else {
      await like?.updateOne({$pull:{reactions:userid}})
      return {liked:false , message:"Un liked sucessfully"}
     }
    
  }
  catch (err){
    console.log(err,"error")
  }
}
export const likecount = async (body:any) =>{

  const post = await PostModel.findById(body.body)
  const likecount = post?.reactions.length
  return likecount;
}
export default PostModel;
