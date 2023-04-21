const mongoose=require('mongoose');

const employeeSchema=mongoose.Schema({

    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    phonenumber:{
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
})

const employeeModel=mongoose.model('employee',employeeSchema);

module.exports={employeeModel};