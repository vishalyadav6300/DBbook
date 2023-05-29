const mongoose=require('mongoose');

const adminSchmea=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const adminModel=mongoose.model('admin',adminSchmea);

module.exports={adminModel};