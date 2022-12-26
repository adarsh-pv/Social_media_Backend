import { Channel } from 'amqplib';
import * as amqp from 'amqplib/callback_api';
import { Connection, connection } from 'mongoose';

export default function ampqp (){
    // console.log(saved,"saved one")
    return new Promise<any>((resolve,reject)=>{
        if(process.env.AmqpURL) amqp.connect(process.env.AmqpURL,(error0,connection)=>{
            if(error0){
                reject(error0)
               throw error0;
            }
            connection.createChannel((error1,Channel)=>{
               if(error1){
                reject(error1)
                   throw error1;
                }
                else{
                    // Channel.consume("hello",(msg)=>{
                    //  console.log("first",msg?.content.toString())
                     resolve(Channel)
                    // })
                 
                }
            })
           })
    })
}
