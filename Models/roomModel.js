const mongoose=require('mongoose');

const roomSchema=mongoose.Schema({
    name:{
        type:String
    },
    type:{
        type:String
    },
    images:[{
        type:String
    }],
    access:[{type:String}]
})

const roomModel=mongoose.model('room',roomSchema);

module.exports={roomModel}