//import express
const express = require("express")
//import session
const session=require("express-session")
//import mongoose
const mongoose=require('mongoose')
//import bcryptjs
const bcryptjs=require('bcryptjs')
const {v4:uuidv4}=require("uuid")
const app = express()
const path=require("path")

const http=require("http").createServer(app)

require("dotenv").config()

//import express async-handler
const errorHandler=require('express-async-handler')

const cors=require("cors")
app.use(cors())
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))


//connected to database
mongoose.connect(process.env.MONGOURL).then(
    console.log('connected to database')
)

//Middleware
app.use(express.json())


//error handling for invalid path
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is invalid`})
})

port=process.env.PORT || 3005
var server = app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
