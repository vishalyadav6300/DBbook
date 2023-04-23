//import cloudinary
const cloudinary=require('cloudinary').v2;

//import multer
const multer=require('multer')

//import multer-storage-cloudinary
const { CloudinaryStorage }=require('multer-storage-cloudinary')

//configure cloudinary

// Configuration 
cloudinary.config({ 
   cloud_name: 'mogalamohnivishal',
   api_key: '913125216547184',
   api_secret: '-buEd72983pclaadfO_mo_AkXN4'
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