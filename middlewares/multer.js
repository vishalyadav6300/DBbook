//import cloudinary
const cloudinary=require('cloudinary').v2;

//config the dotenv
require("dotenv").config()

//import multer
const multer=require('multer')

//import multer-storage-cloudinary
const { CloudinaryStorage }=require('multer-storage-cloudinary')

//configure cloudinary

// Configuration 
cloudinary.config({ 
   cloud_name: process.env.cloud_name,
   api_key: process.env.api_key,
   api_secret: process.env.api_secret
 });

  
//configure cloudinary storage
const cloudStorage=new CloudinaryStorage({
   cloudinary:cloudinary,
   params:async (req,file)=>{
      return {
         folder:'DBbook',
         public_id:file.fieldname+'-'+Date.now()
      }
   }
})

//configure multer
const multerObj=multer({storage:cloudStorage})


module.exports={multerObj};