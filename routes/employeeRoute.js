const express=require('express');
const { verifyTokenAdmin, verifyTokenUser } = require('../middlewares/verifyToken');

const upload=require('../middlewares/multer').multerObj

const employeeRoute=express.Router();

//importing Controllers

const empolyeeController=require('./../controllers/employeeController')

employeeRoute.post('/add-employee',verifyTokenAdmin,upload.single('profilePic'),empolyeeController.addEmployee);

employeeRoute.get('/all-employee',verifyTokenUser,empolyeeController.allEmployees);

employeeRoute.post('/paginate',empolyeeController.pagination);

employeeRoute.get('/checkuser/:user',empolyeeController.checkuser)


module.exports={employeeRoute}