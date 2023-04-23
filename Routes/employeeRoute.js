const express=require('express');

const upload=require('../Middlewares/multer').multerObj

const employeeRoute=express.Router();

//importing Controllers

const empolyeeController=require('./../Controllers/employeeController')

employeeRoute.post('/add-employee',upload.single('profilePic'),empolyeeController.addEmployee);

employeeRoute.get('/all-employee',empolyeeController.allEmployees);

module.exports={employeeRoute}