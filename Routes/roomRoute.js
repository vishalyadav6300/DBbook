const express=require('express')

const roomRoute=express.Router();

const upload=require('./../Middlewares/multer').multerObj


const roomController=require('./../Controllers/roomController')



roomRoute.post('/add-room',upload.single('image'),roomController.addRoom);

roomRoute.get('/allrooms',roomController.allrooms)

roomRoute.post('/delete-room',roomController.deleteRoom);

roomRoute.post('/room-specific-access',roomController.roomSpecificAccess);

roomRoute.post('/filter',roomController.filterByType);

module.exports={roomRoute};