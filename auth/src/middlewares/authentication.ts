/* eslint-disable no-empty */
import { Request , Response , NextFunction } from "express"
import {verify} from "jsonwebtoken"
import {findUser} from '../Model/userModel'

export const userAuth = (req: Request,res: Response,next: NextFunction) =>{
   console.log(req.headers.token)
 if(req.headers?.token){
    const token:any = req.headers.token;
    const secret: string | undefined = process.env.JWT_SECRET_KEY 
   
    if(secret){
      try{
         verify(token,secret,async(err:any,decoded:any)=>{
            if(err){
               console.log(err)
               return res.send(401).send("authenticationfailed")
            }else{
               req.body.user = {};
               req.body.user.id = decoded.id
               req.body.user.email = decoded.email
               const data = await findUser(decoded.email);
               if(data){
                  req.body.user.name = data.name;
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