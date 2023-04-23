const jwt=require('jsonwebtoken')

//import dotenv
require('dotenv').config()

const verifyToken=(req,res,next)=>{
     //get token from req obj
     let tokenWithBearer=req.headers.authorization;
     
     let token;

     //if token is not present
     if(tokenWithBearer==undefined){
         res.send({message:"unauthorized access"})
     }
     else{
      token =tokenWithBearer.split(" ")[1]
    
         //verify the token
         jwt.verify(token,process.env.SECRETKEY,(err,decoded)=>{
               if(err){
                res.send({message:"session expired .... login to continue"})
                console.log(err.message)
               }
               else{
                   next();
               }
         })

     }
}

module.exports=verifyToken;
Footer