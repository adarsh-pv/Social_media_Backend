import express from "express";
import { json } from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { connect } from "./Model/mongoConnection";
import PostRoute from "./Router/postRouter";
import  Mongoose  from "mongoose";
import connectq from './Rabitmq/rabitmq'
connect();
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieparser());
app.use("/", PostRoute);
const connection = Mongoose.connection;
connectq().then((channel)=>{
  app.listen(4001, () => {
    console.log("Running in 4001");
  });
})

