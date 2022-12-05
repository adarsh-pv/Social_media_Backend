
import mongoose, { model, ObjectId, Schema } from 'mongoose'

interface Ipost {
  userid: ObjectId;
  caption: string;
  image:string;
  comments: [{ content: string; userId: ObjectId }];
  reactions: [{ type: string; userId: ObjectId }];
  methods:{
     createPost: () => {};
  }
}
const postSchema =  new Schema<Ipost>({
  userid:{type:mongoose.Types.ObjectId},
  caption:{type:String},
  image:{type:String,required:true},
  comments: { type: [{ content: String, userId: mongoose.Types.ObjectId }] },
  reactions: { type: [{ type: String, userId: mongoose.Types.ObjectId }] },
  

})
postSchema.methods.createPost = async(data: any) => {
  return await mongoose.model('Post').create(data);
};

const PostModel = model<Ipost>("Post",postSchema)

export const createpost = async (data:any) =>{
  await PostModel.create(data).then(()=>{return true}).catch(()=>{return false})
}
export const viewall = async () =>{
//  let posts = await PostModel.find().populate('userid')
//  console.log(posts,"=============")
 return await PostModel.aggregate([
  {
    $lookup:{
      from:"users",
      localField:"userid",
      foreignField:"_id",
      as:"userid"
    }
  },
  {
    $unwind:{
      path:"$userid"
    }
  }
 ]);
};
export default PostModel;