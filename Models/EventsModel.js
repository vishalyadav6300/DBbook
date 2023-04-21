const mongoose=require('mongoose');

const eventSchema=mongoose.Schema({
    date:{
        type:Date
    },
    time:{
        type:Date.toString()
    },
    head:{
        type:String
    },
    room:{RoomSchemaRef},
    invitees:[],
    status:{pending,accepted,completed,rejected}//Rescheduling option,
})

const eventModel=mongoose.model('event',eventSchema)

module.exports={eventModel}