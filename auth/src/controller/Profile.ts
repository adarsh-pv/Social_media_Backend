import { addProfileImage,ProfileDetails,coverphoto, profileextra, findallusers, follwdetails, usersprofile,fetchusers, followingmembers, followermembers, logineduser, getusers, searchengine} from "../Model/userModel"
import { json, Request,Response } from "express"


export const profilephoto = async(req:Request,res:Response)=>{
    try{
      const response = await addProfileImage(req.body)
      console.log(response,"yeee")
      res.status(200).json("profileupdated")
    //  if(response){
    //      res.status(200).send("sucessfully edited")
    //  }
     }catch(error){
      console.log(error)
      res.status(500).json(error)
     }
    }
  export const profileDetails  =async (req:Request,res:Response) => {
    console.log(req.body,"kk")
    const response = await ProfileDetails(req.body.user.id)
    res.status(200).json(response)
  } 
    
export const coverphotos = async (req:Request, res:Response)=>{
  console.log(req.body.user.id,"id")
  const response = await coverphoto(req.body)
      res.status(200).json(response)
  } 
export const profileextradata = async (req:Request,res:Response) =>{
  const response = await profileextra(req.body)
  console.log(response,"respro")
  res.status(200).json(response)
}
export const allusers = async (req:Request,res:Response) =>{
  const response = await findallusers(req.body)
  res.status(200).json(response)
}
export const follow = async (req:Request,res:Response) =>{
  const response = await follwdetails(req.body)
  res.status(200).json(response)
}
export const userprofile = async (req:Request,res:Response) =>{
  const response = await usersprofile(req.body.body)
  console.log(response,"pp")
  res.status(200).json(response)
}
// export const Savedpost = async (req:Request,res:Response) =>{
//   const response = await savedposts(req.body)
//  res.status(200).json(response)
// }
export const fetchalluser = async (req:Request,res:Response) =>{
  const response = await fetchusers(req.body)
  res.status(200).json(response)
}
export const followinguser = async (req:Request,res:Response) =>{
   const response = await followingmembers(req.body)
   console.log(response,"following")
   res.status(200).json(response)
}
export const followuser = async (req:Request,res:Response) =>{
   const response = await followermembers(req.body)
   console.log(response,"follwers")
   res.status(200).json(response)
}
export const loginuser = async (req:Request,res:Response) =>{
  const response = await logineduser(req.body.user.id)
  res.status(200).json(response)
}
export const getUser = async (req:Request,res:Response) =>{
  const id = req.params.id
  const response = await getusers(req.params.id)
  res.status(200).json(response)
}
export const searchdata =  async (req:Request,res:Response) =>{
 const response = await searchengine(req.body.body)
 res.status(200).json(response)
}


