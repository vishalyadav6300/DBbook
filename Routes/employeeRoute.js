const express=require('express');
const { verifyTokenAdmin, verifyTokenUser } = require('../Middlewares/verifyToken');

const upload=require('../Middlewares/multer').multerObj

const employeeRoute=express.Router();

//importing Controllers

const empolyeeController=require('./../Controllers/employeeController')

employeeRoute.post('/add-employee',verifyTokenAdmin,upload.single('profilePic'),empolyeeController.addEmployee);

employeeRoute.get('/all-employee',verifyTokenUser,empolyeeController.allEmployees);


module.exports={employeeRoute}