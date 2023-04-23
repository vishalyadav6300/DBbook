const mongoose=require('mongoose');

const roomSchema=mongoose.Schema({
    roomName:{
        type:String
    },
    roomType:{
        type:String
    },
    capacity:{
        type:Number
    },
    image:{
        type:String
    },
    access:[{
        type:String
    }]
})

const roomModel=mongoose.model('room',roomSchema);

module.exports={roomModel}