import { Router, json } from "express";
import cors from "cors";
import { commentedusers, Commentpost, createPost, fetchreportedPosts, fetchsavedpost, likepost, reporting, saved, sharepost, showmyphoto, showPost, trash } from "../Controller/postcontroller";
import { verifytoken } from "../Middlewares/authenticatioin";

const route = Router();
route.use(json());
route.use(cors());
        
route.post("/createpost", verifytoken, createPost);
route.get("/allposts", verifytoken,showPost);
route.post('/likepost',verifytoken,likepost)
route.post('/commentpost',verifytoken,Commentpost)
route.post('/showcommenteduser',commentedusers)
route.post('/showmyposts',verifytoken,showmyphoto)
route.post('/savedfile',verifytoken,saved)
route.get('/fetchsaveditems',verifytoken,fetchsavedpost)
route.post('/deletepost',trash)
route.post('/sharepost',sharepost)
route.patch('/reportpost',verifytoken,reporting)
route.get('/fetchreportedposts',fetchreportedPosts)
route.post('/postdelete',trash)







export default route;
