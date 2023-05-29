const express=require("express")

const adminroute=express.Router()

adminroute.use(express.json())

const admincontroller=require("../controllers/adminController")

adminroute.get("/dashboard",admincontroller.dashboard)
adminroute.get("/todayevents",admincontroller.todayevents)


module.exports={adminroute}