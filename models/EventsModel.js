const mongoose=require('mongoose');
const employeeModel=require('./employeeModel').employeeModel
const roomModel=require('./../models/roomModel').roomModel

const eventSchema=mongoose.Schema({
    event_name:{
        type:String,
        required:true
    },
    start_time:{
        type:Date,
        required:true
    },
    end_time:{
        type:Date,
        required:true
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:employeeModel,
        required:true
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:roomModel,
        required:true
    },
    status:{
        type:String,
        enum:['booked','completed','cancelled','ongoing'],
        default:'booked'
    },
    invitees:[{type:mongoose.Schema.Types.ObjectId}]
},{timestamps: true})

const eventModel=mongoose.model('event',eventSchema)

module.exports={eventModel,eventSchema}