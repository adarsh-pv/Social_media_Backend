import { Response,Request } from 'express'
import { ObjectId } from 'mongoose'
import  Jwt, { verify }  from "jsonwebtoken";
import { createAdmin, verifyadmin, veriify } from '../Model/adminModel'
import User, { alluserslist, block, findallusers, usersprofile } from '../Model/userModel';


const SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY
export const signToken = (_id:ObjectId, email:string)=>{
    if(SECRET_KEY){
    
      const token = Jwt.sign({_id,email },SECRET_KEY,{
            expiresIn : "2 days"
        })
        return token
    }

} 
export const adminSignup = async (req:Request,res:Response)=>{
    const name = req.body.body.name
    const email = req.body.body.email
    const password = req.body.body.password
 const response = await createAdmin(name,email,password)
 console.log(response)
 if(response){
     const token = signToken(response?._id,response?.email)
     res.status(201).json({token})
 }
}
export const adminLogin = async (req:Request,res:Response) =>{
    const response = await veriify(req.body.body)
    if(response.email){
        const {_id,email,name} = response;
        const token = signToken(_id,email)
        console.log(token,"tple")
      return res.status(201).cookie('token',token).json({token,name,_id})
    }
}
export const findalluser= async (req:Request,res:Response) =>{
    const page  =req.query.page
    const item_perPage = 5;
   const TotalUsers =await User.find().countDocuments()
   if( typeof page === 'string' ) {
    {
        const response = await alluserslist(parseInt(page),item_perPage)
        res.status(200).json({response,TotalUsers})

    }
   }
  }
  export const blockUser = async (req:Request,res:Response) =>{
    const response = await block(req.body.id)
    res.status(200).json(response)
  }
export const Adminverify = async (req:Request,res:Response)=>{
    const response = await verifyadmin(req.body)
    if(response?.$isValid){
        res.send('verified')
        res.sendStatus(401)
    }
}
