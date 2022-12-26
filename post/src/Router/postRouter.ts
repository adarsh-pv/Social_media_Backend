import { Router, json } from "express";
import cors from "cors";
import { commentedusers, Commentpost, createPost, fetchsavedpost, likepost, saved, showmyphoto, showPost } from "../Controller/postcontroller";
import { verifytoken } from "../Middlewares/authenticatioin";

const route = Router();
route.use(json());
route.use(cors());
        
route.post("/createpost", verifytoken, createPost);
route.get("/allposts", verifytoken,showPost);
route.post('/likepost',verifytoken,likepost)
route.post('/commentpost',verifytoken,Commentpost)
route.post('/showcommenteduser',commentedusers)
route.get('/showmyposts',verifytoken,showmyphoto)
route.post('/savedfile',verifytoken,saved)
route.get('/fetchsaveditems',verifytoken,fetchsavedpost)







export default route;
