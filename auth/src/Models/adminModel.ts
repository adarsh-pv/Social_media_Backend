import mongoose, { Schema, model, ObjectId, Mongoose } from "mongoose";
import { hashpassword, comparepass } from "../Controllers/password";

interface IAdmin {
  name: string;
  email: string;
  password: string;
  _id?: ObjectId;
  conpassword?: string;
}

const adminScheema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  conpassword: { type: String },
});
const Admin = model<IAdmin>("Admin", adminScheema);

type data = {
  name: string;
  email?: string;
  password: string;
  _id?: ObjectId;
};
export const createAdmin = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const hashedpassword = await hashpassword(password);
    const admin = new Admin({
      name,
      email,
      password: hashedpassword,
    }).save();
    return admin;
  } catch (error) {
    console.log(error);
  }
};
export const verifyadmin = async (body: any) => {
  try {
    const isValid = await Admin.findById(body.user.id);
    return isValid;
  } catch (error) {
    console.log(error);
  }
};
type types = {
  email: string;
  password: string;
};
export const veriify = async (body: types): Promise<any> => {
  const { email, password } = body;
  try {
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      const response = await comparepass(admin.password, password);
      const { email, name, _id } = admin;

      if (response) return { email, _id, name };
      else {
        return { failed: true, message: "Invalid password" };
      }
    } else {
      return { failed: true, message: "User not found" };
    }
  } catch (error) {
    console.log(error);
  }
};
