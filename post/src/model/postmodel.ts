/* eslint-disable @typescript-eslint/ban-types */
// import e from "express";
import mongoose, { Date, model, ObjectId, Schema, Types } from "mongoose";
import ampqp from "../Rabitmq/rabitmq";

interface Ipost {
  userid: ObjectId;
  caption: string;
  image: string;
  comments: [{ content: string; userId: ObjectId; Date: Date }];
  reactions: [{ type: string; userId: ObjectId }];
  reportedusers:[{type:ObjectId,userId:ObjectId}];
  saved:[{type:string;userId:ObjectId}]
  methods: {
    createPost: () => {};
  },
  status:boolean
}
const postSchema = new Schema<Ipost>(
  {
    userid: { type: mongoose.Types.ObjectId },
    caption: { type: String },
    image: { type: String },
    status:{default:false ,type:Boolean},
    comments: {
      type: [
        {
          content: String,
          userId: mongoose.Types.ObjectId,
          Date: { type: Date, default: new Date() },
        },
      ],
      required: true,
    },
    reactions: { type: [{ type: String, userId: mongoose.Types.ObjectId }] },
    saved:{type: [{type:String,userId:mongoose.Types.ObjectId}]},
    reportedusers:[{type:mongoose.Types.ObjectId,userId:mongoose.Types.ObjectId}]
  },
  { timestamps: true }
);
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
export const viewall = async (userid:any) => {
 const id = new mongoose.Types.ObjectId(userid)
   console.log(id,"kkuji")
  console.log(typeof(id));
  // mongoose.Types.ObjectId(userid)
  
  //  let posts = await PostModel.find().populate('userid')
  //  console.log(posts,"=============")

  const posts = await PostModel.aggregate([
    {
     $match:{
     status:false,
     reportedusers:{$nin:[id]}
     },
    },
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
   
    {
      $sort: {
        createdAt: -1,
      },
    },

  ]);
  // console.log(posts,"postewwwwwwwwwwwwwwwwwwwwww")
  
  return posts;
};

export const commentedUsers = async (postid: string) => {
  return await PostModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(postid),
      },
    },
    {
      $unwind: {
        path: "$comments",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "comments.userId",
        foreignField: "_id",
        as: "username",
      },
    },

    {
      $project: {
        comments: 1,
        username: 1,
      },
    },
    {
      $unwind: {
        path: "$username",
      },
    },
  ]);
};
export const Likepost = async (body: any) => {
  const id = body.body;
  const userid = body.user.id;
  if (!id && userid) {
    return { message: "all filed are required" };
  }
  try {
    if (!userid && !id) {
      return { message: "you are unautharised,You are un authoried" };
    }
    const post = await PostModel.findById(id);
    // const reaction = { userId:userid}
    if (!post?.reactions.includes(userid)) {
      const app = await post?.updateOne({ $push: { reactions: userid } });
      return { liked: true, message: "Liked sucessfully" };
    } else {
      await post.updateOne({ $pull: { reactions: userid } });
      return { liked: false, message: "Un liked sucessfully" };
    }
  } catch (err) {
    console.log(err, "error");
  }
};
export const docomment = async (body: any) => {
  const comment = body.body.values.comment;
  const postid = body.body.post;
  const userid = body.user.id;
  if (!comment && !postid) {
    return { message: "all filed are required" };
  }
  if (!userid && !comment) {
    return { message: "you are unautharized" };
  } else {
    const post = await PostModel.findById(postid);
    if (post?.comments) {
      const update = { content: comment, userId: userid, Date: Date.now() };
      const app = await post?.updateOne({ $push: { comments: update } });
      return app;
    }
  }
};
export const showmyposts = async (data: any) => {
  const user = data
  //  return await PostModel.find({userid:data.user.id}).sort({createdAt: -1});
  return await PostModel.aggregate([
    {
      $match:{
        userid:new Types.ObjectId(user),
        status:false
      }
    },
    {
      $sort:{
        createdAt: -1
      }
    }
  ])
};
export const savedposts = async (body:any) =>{
  const id = body.id
  const userid = body.user.id
  const post = await PostModel.findById({_id:id})
  if (!post?.saved.includes(userid)) {
   await  post?.updateOne({$push:{saved:userid}})
   return {saved:true , message:"saved"}
  }else{
    await post?.updateOne({$pull:{saved:userid}})
   return {saved:false , message:"Unsaved"}
  }
}
export const fetchsaveitems = async (body:any) =>{
  const userid = body.user.id
 return await PostModel.find({saved:{$in:[userid]}})

}
export const movetotrash = async (body:any) =>{
return await PostModel.findByIdAndUpdate(body.postid,{$set:{ status:true}})
}
export const shareposts =async (id:any) =>{
return await PostModel.aggregate([
  {
    $match: {
      _id: new mongoose.Types.ObjectId(id),
    },
  },
  {
    $lookup: {
     from:"users",
    localField: "userid",
     foreignField: "_id",
     as: "users"
}
  }
])

}
export const reportpost = async (userid:any,post:any)=>{
  const postinfo = await PostModel.findById(post)
  if(postinfo){
   return await postinfo.updateOne({$push:{reportedusers:userid}})
  } 
}
export default PostModel;

