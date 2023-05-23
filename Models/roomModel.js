const mongoose=require('mongoose');

const roomSchema=mongoose.Schema({
    roomName:{
        type:String,
        required:true
    },
    roomType:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        required:true,
        // validate: {
        //     validator: (v) => {
        //         return v<0;
        //     },
        //     message: 'Invalid capacity.'
        // },
    },
    image:{
        type:String,
        required:true
    },
    access:[{
        type:String
    }]
})

const roomModel=mongoose.model('room',roomSchema);

module.exports={roomModel}