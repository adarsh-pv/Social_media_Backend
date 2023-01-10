import express from "express";
import { json } from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { connect } from "./Models/mongoConnection";
import PostRoute from "./Router/postRouter";
import  Mongoose  from "mongoose";

connect();
const app = express();
const origin =['http://localhost:3000','https://socialmedia-370608.web.app']
app.use(cors({ credentials: true, origin: origin }));
app.use(express.json());
app.use(cookieparser());
app.use("/", PostRoute);
const connection = Mongoose.connection;
// connectus().then((channel)=>{
  app.listen(4001, () => {
    console.log("Running in 4001");
  });
// })   



