const mongoose=require('mongoose');
const eventModel=require('./EventsModel').eventModel
const employeeSchema=mongoose.Schema({
    profilePic:{
        type:String
    },
    employeeName:{
        type:String
    },
    username:{
        type:String
    },
    gender:{
        type:String
    },
    password:{
        type:String
    },
    department:{
        type:String
    },
    module:{
        type:String
    },
    position:{
        type:String
    },
    email:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    limit:{
        type:Number,
        default:3
    },
    date:{
        type:Date,
        default:Date.now()
    }
    // ,
    // events:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:eventModel
    // }]
})

const employeeModel=mongoose.model('employee',employeeSchema);

module.exports={employeeModel};