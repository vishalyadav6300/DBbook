const express=require('express')

const roomRoute=express.Router();

const upload=require('./../Middlewares/multer').multerObj


const roomController=require('./../Controllers/roomController')



roomRoute.post('/add-room',upload.single('image'),roomController.addRoom);
roomRoute.get('/allrooms',roomController.allrooms)

module.exports={roomRoute};