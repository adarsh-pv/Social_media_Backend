import   {Router , json }  from "express";
import { login, signup , sendVerify } from "../Controllers/Authentication";
import cors from "cors";
import { userAuth} from "../middlewares/authentication";
import { coverphotos, profilephoto,profileDetails, profileextradata, allusers, follow, userprofile,  fetchalluser, followinguser, followuser, loginuser, getUser, searchdata, fetchmyfollwing} from "../Controllers/Profile";
import { createChat, findChat, userChats } from "../Controllers/Chat";
// import { createprofile } from "../controller/Profile";
const route = Router()
route.use(json())
route.use(cors())

route.post('/register',signup);
route.post('/login',login);
route.get('/verify',userAuth,sendVerify); 
route.post('/profilephoto',userAuth,profilephoto);
route.post('/coverphoto',userAuth,coverphotos);
route.get('/profileDetails',userAuth,profileDetails)
route.post('/profileextradata',userAuth,profileextradata)
route.get('/allusers',userAuth,allusers)
route.post('/follow',userAuth,follow)
route.post('/userprofile',userprofile)
// route.post('/savedposts',userAuth,Savedpost)
route.get('/fetchallusers',userAuth,fetchalluser)
route.get('/followingusers',userAuth,followinguser)
route.get('/followersusers',userAuth,followuser)
route.get('/logineduser',userAuth,loginuser)
route.get('/getUserdata/:id',getUser)
route.put('/Searchengine',searchdata)
route.get('/fetchmyfollowing',userAuth,fetchmyfollwing)




export default route
