//import express
const express = require("express")
//import session
const session = require("express-session")
//import mongoose
const mongoose = require('mongoose')
//import bcryptjs
const bcryptjs = require('bcryptjs')
const { v4: uuidv4 } = require("uuid")
const app = express()
const path = require("path")

const http = require("http").createServer(app)

require("dotenv").config()

//importing modules

const adminModel = require('./Models/adminModel').adminModel

//import express async-handler
const errorHandler = require('express-async-handler')

const cors = require("cors")
app.use(cors())
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))


//connected to database
mongoose.connect(process.env.MONGOURL).then(
    console.log('connected to database')
)

//Middleware
app.use(express.json())

//importing routes
const employeeRoute = require('./Routes/employeeRoute').employeeRoute

const roomRoute=require('./Routes/roomRoute').roomRoute

const eventRoute=require('./Routes/eventRoute').eventRoute
app.use('/employee',employeeRoute);
app.use('/room',roomRoute);
app.use('/event',eventRoute);

app.post('/', async (req, res) => {
    let adminObj = req.body;
    await adminModel.create(adminObj);
    res.send({ message: "sent" })
})

//error handling for invalid path
app.use((req, res, next) => {
    res.send({ message: `path ${req.url} is invalid` })
})

port = process.env.PORT || 3005
var server = app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
