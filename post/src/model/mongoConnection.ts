import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongo: string | undefined = process.env.MONGO_CONNECTION;

export const connect = () => {
  if (mongo) {
    mongoose.connect(mongo);
  }
};
const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("connected");
});
connection.on("error", () => {
  console.log("error");
});

export default mongoose;
