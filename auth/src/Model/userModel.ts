/* eslint-disable @typescript-eslint/ban-types */
import { Schema, model, ObjectId } from "mongoose";
import { comparepass, hashpassword } from "../controller/password";
// import bcrypt, { compare } from 'bcrypt'

interface IUser {
  name: string;
  email: string;
  number: number;
  password: string;
  _id?: ObjectId;
  userLogin: () => {};
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: Number },
  password: { type: String },
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
  console.log("kkk");
  const { name, number, password, email } = data;
  try {
    const hashedpassword = await hashpassword(password);
    // console.log(hashedpassword)
    const user = new User({
      name,
      number,
      password: hashedpassword,
      email,
    });
    const newuser = await user.save();
    return newuser;
  } catch (error) {
    console.log(error);
  }
};
type datas = {
  email: string;
  password: string;
};

export const userLogin = async (data: datas): Promise<any > => {
  const { email } = data;
  console.log(data);
  try {
    // const email = data.email
    const user = await User.findOne({ email: email });
    console.log(user, "user is here");
    if (user) {
      // let password = data.password
      const response = await comparepass(user.password, data.password);
      const { email, name, _id } = user;
      if (response) return { email, _id, name };
      else {
        return { failed: true, maessage: "Invalid password" };
      }
    } else {
      return { failed: true, message: "User not found" };
    }
  } catch (error) {
    console.log(error, "ooooo");
  }
};
export const findUser = (email: string) => {
  return User.findOne({ email: email });
};
export default User;
