/* eslint-disable @typescript-eslint/ban-types */
import { application } from "express";
import mongoose, { Schema, model, ObjectId, Mongoose } from "mongoose";
import { comparepass, hashpassword } from "../Controllers/password";
// import bcrypt, { compare } from 'bcrypt'

interface IUser {
  name: string;
  email: string;
  number: number;
  password: string;
  _id?: ObjectId;
  followers: [{ type: string; userId: ObjectId }];
  following: [{ type: string; userId: ObjectId }];
  // savedposts: [{ type: string; userId: ObjectId }];
  posts: [{ content: string; userId: ObjectId }];
  profileimage: string;
  coverimage: string;
  verified: Boolean;
  status: string;
  dob: string;
  workat: string;
  githubid: string;
  linkedinid: string;
  Livesin: string;
  isBlocked: Boolean;
  userLogin: () => {};
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: Number },
  password: { type: String },
  followers: { type: [{ type: mongoose.Types.ObjectId }] },
  following: { type: [{ type: mongoose.Types.ObjectId }] },
  // savedposts: { type: [{ type: mongoose.Types.ObjectId }] },
  posts: { type: [{ content: String, userId: mongoose.Types.ObjectId }] },
  dob: { type: String, default: null },
  workat: { type: String, default: null },
  Livesin: { type: String, default: null },
  profileimage: { type: String, default: null },
  coverimage: { type: String, default: null },
  linkedinid: { type: String, default: null },
  status: { type: String, default: null },
  verified: { type: Boolean, default: true },
  githubid: { type: String, default: null },
  isBlocked: { type: Boolean, default: false },
});

// 3. Create a Model.
const User = model<IUser>("User", userSchema);

type data = {
  name?: string;
  number?: number;
  password: string;
  email?: string;
  _id?: ObjectId;
};
// run().catch(err => console.log(err));
export const createUser = async (data: data) => {
  const { name, number, password, email } = data;
  try {
    const exist =await User.find({email:email})
    if(exist.length>0){
      return {exist:true,message:"user already exist"}
    }else{
      const hashedpassword = await hashpassword(password);
      const user = new User({
        name,
        number,
        password: hashedpassword,
        email,
      });
      const newuser = await user.save();
      return newuser;
    }
  } catch (error) {
    console.log(error);
  }
};
type datas = {
  email: string;
  password: string;
};

export const userLogin = async (data: datas): Promise<any> => {
  const { email } = data;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.isBlocked === true) {
        return { failed: true, message: "You're Blocked" };
      } else {
        if(user?.password){
          const response = await comparepass(user.password, data.password);
          const { email, name, _id } = user;
          if (response) return { email, _id, name };
        }
        else {
          return { failed: true, maessage: "Invalid password" };
        }
      }
    } else {
      return { failed: true, message: "User not found" };
    }
  } catch (error) {
    console.log(error, "ooooo");
  }
};
export const findUser = (email: string) => {
  try {
    return User.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }
};
export const addProfileImage = async (body: any) => {
  try {
    const profile = await User.findByIdAndUpdate(body.user.id, {
      profileimage: body.body,
    });
  } catch (error) {
    console.log(error);
  }
};
export const coverphoto = async (body: any) => {
  try {
    const cover = await User.findByIdAndUpdate(body.user.id, {
      coverimage: body.body,
    });
  } catch (error) {
    console.log(error);
  }
};
export const profileextra = async (body: any) => {
  try {
    const profiledata = await User.findByIdAndUpdate(body.user.id, {
      $set: {
        name: body.data.fullname,
        number: body.data.number,
        Livesin: body.data.livesin,
        workat: body.data.works,
        dob: body.data.DOB,
        githubid: body.data.githublink,
        linkedinid: body.data.linkdinlink,
      },
    });
    return profiledata;
  } catch (error) {
    console.log(error);
  }
};
export const ProfileDetails = async (id: ObjectId) => {
  try {
    return User.findOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
};
export const findallusers = async (body: any) => {
  try {
    const id = body.user.id;
    const following = await User.findById(id, "following");
    const hiddenIds = following?.following;
    hiddenIds?.push(id);
    return await User.find({ _id: { $nin: hiddenIds } });
  } catch (error) {
    console.log(error);
  }
};
export const follwdetails = async (body: any) => {
  try {
    const id = body.user.id;
    const followingid = body.body;
    const response = await User.findById(id);
    const follwing = await response?.following
    const followers = await response?.followers
    const follower = await User.findById(followingid);
    if (!response?.following.includes(followingid)) {
      await response?.updateOne({ $push: { following: followingid } });
      await follower?.updateOne({ $push: { followers: id } });
      return { following: true, massaage: "following sucessfully"};
    } else {
      await response.updateOne({ $pull: { following: followingid } });
      await follower?.updateOne({ $pull: { followers: id } });
      return { following: false, message: "unfollow sucessfully" };
    }
  } catch (error) {
    console.log(error);
  }
};
export const usersprofile = async (id: ObjectId) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.log(error);
  }
};
export const logineduser = async (id: ObjectId) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.log(error);
  }
};
export const fetchusers = async (body: any) => {
  try {
    const userid = body.user.id;
    return await User.find({ _id: { $ne: userid } });
  } catch (error) {
    console.log(error);
  }
};
export const followingmembers = async (body: any) => {
  try {
    const userid = body.user.id;
    return await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userid),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "followinguser",
        },
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
export const followermembers = async (body: any) => {
  try {
    const userid = body.user.id;
    const user = await User.findById(userid);
    return await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userid),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers",
          foreignField: "_id",
          as: "followeruser",
        },
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
export const getusers = async (id: any) => {
  try {
    return await User.findById({ _id: id });
  } catch (error) {
    console.log(error);
  }
};
export const searchengine = async (body: any) => {
  try {
    return await User.find({
      name: { $regex: new RegExp(body), $options: "si" },
    });
  } catch (error) {
    console.log(error);
  }
};
export const alluserslist = async (page: number, itemperPage: number) => {
  try {
    return await User.find()
      .skip((page - 1) * itemperPage)
      .limit(itemperPage);
  } catch (error) {
    console.log(error);
  }
};
export const block = async (userid: any) => {
  try {
    const id = new mongoose.Types.ObjectId(userid);
    const user = await User.findById({ _id: id });
    if (user?.isBlocked === false) {
      const response = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { isBlocked: true } },
        { new: true }
      );
      return response;
    }
    if (user?.isBlocked === true) {
      const response = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { isBlocked: false } },
        { new: true }
      );
      return response;
    }
  } catch (error) {
    console.error(error);
    return null; // or throw a custom error
  }
};
export const myfollwing = async (id:ObjectId) =>{
try {
  const user = await User.findById({_id:id})
  const following =  user?.following
  const followers =  user?.followers
  return {following,followers}
} catch (error) {
  console.log(error)
}
}

export default User;
