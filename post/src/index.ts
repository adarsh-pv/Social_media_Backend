import express from "express";
import { json } from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { connect } from "./model/mongoConnection";
import PostRoute from "./Router/postRouter";
connect();
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieparser());
app.use("/", PostRoute);

app.listen(4001, () => {
  console.log("Running in 4001");
});
