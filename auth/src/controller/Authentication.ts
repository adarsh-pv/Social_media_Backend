import  Jwt  from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { createUser, userLogin } from "../Model/userModel";
import { Request,Response } from "express";

const SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY
export const signToken = (_id:ObjectId, email:string)=>{
    if(SECRET_KEY){
    
      const   token = Jwt.sign({_id,email },SECRET_KEY,{
            expiresIn : "2 days"
        })
        return token
    }   

}  

export const signup = async (req:Request,res:Response) =>{
 const register= await createUser(req.body.body);
console.log("first",register)
 if(register){
 const token = signToken(register?._id,register?.email)
       res.status(201).json({token})
}
}
export const  login = async (req:Request,res:Response)=>{
    console.log("login")
    type user ={_id:ObjectId,email:string,password:string,name:string}
    const response:user= await userLogin(req.body.body)
    if(response.email){
    const {_id,email,name} = response;
    const token = signToken(_id,email)
  return res.status(201).json({token,name,_id})
}
else{
    return res.send(response)
}

}
export const sendVerify = async (req: Request, res: Response) => {
    return res.send(req.body.user);
  };


  



