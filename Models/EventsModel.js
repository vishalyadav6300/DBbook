const mongoose=require('mongoose');
const employeeModel=require('./employeeModel').employeeModel
const roomModel=require('./../Models/roomModel').roomModel

const eventSchema=mongoose.Schema({
    start_time:{
        type:Date
    },
    end_time:{
        type:Date
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:employeeModel
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:roomModel
    },
    status:{
        type:String,
        enum:['booked','completed','cancelled','ongoing'],
        default:'booked'
    }
},{timestamps: true})

const eventModel=mongoose.model('event',eventSchema)

module.exports={eventModel,eventSchema}