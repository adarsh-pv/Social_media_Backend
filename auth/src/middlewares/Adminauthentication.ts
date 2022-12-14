/* eslint-disable no-empty */
import { Request , Response , NextFunction } from "express"
import {verify} from "jsonwebtoken"
import {findUser} from '../Models/userModel'

export const adminAuth = (req: Request,res: Response,next: NextFunction) =>{
 if(req.headers?.admintoken){
   console.log(req.headers,"hi")
    const token:any = req.headers.admintoken;
    console.log(token,"tokenn")
    const secret: string | undefined = process.env.JWT_SECRET_KEY 
    if(secret){
      console.log(secret,"sectet")
      try{
         verify(token,secret,async(err:any,decoded:any)=>{
            console.log(decoded)
            if(err){
               console.log(err)
               return res.send(401).send("authenticationfailed")
            }else{
               req.body.user = {};
               req.body.user.id = decoded._id;
               const data = await findUser(decoded.email);
               if(data){
                  return next()
               }
            }
         });
      }catch(error){}
      
      }else{
         res.status(401).send("authentication failed")
    }
    }else{
      res.status(401).send("authentication failed")
 }
}