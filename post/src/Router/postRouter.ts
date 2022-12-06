import { Router, json } from "express";
import cors from "cors";
import { commentpost, createPost, likepost, showPost } from "../controller/postcontroller";
import { verifytoken } from "../middlewares/authenticatioin";

const route = Router();
route.use(json());
route.use(cors());

route.post("/createpost", verifytoken, createPost);
route.get("/allposts", showPost);
route.post('/likepost',verifytoken,likepost)
route.post('/comment',verifytoken,commentpost)
// route.get('/verify',verifytoken)

export default route;
