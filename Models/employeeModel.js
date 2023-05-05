const mongoose=require('mongoose');
const employeeSchema=mongoose.Schema({
    profilePic:{
        type:String,
        required:true
    },
    employeeName:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female','others']
    },
    password:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    module:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    limit:{
        type:Number,
        default:3
    },
    date:{
        type:Date,
        default:Date.now()
    },
    Events:[{
        type:mongoose.Schema.Types.ObjectId
    }]
})

const employeeModel=mongoose.model('employee',employeeSchema);

module.exports={employeeModel};