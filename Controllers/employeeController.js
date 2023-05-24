//importing employee model
const employeeModel=require('./../Models/employeeModel').employeeModel
const eventModel=require('./../Models/EventsModel').eventModel

async function addEmployee(req,res){
    try{
        let employeeObj=JSON.parse(req.body.employeeObj);
        employeeObj['profilePic']=req.file.path;
        let employee=await employeeModel.findOne({email:employeeObj.email});
    
        if(employee!==null){
            res.send({message:"Employee already exist"});
            return;
        }
        await employeeModel.create(employeeObj);
    
        let employees=await employeeModel.find({});
       
        res.send({message:"Employee created",emploee:employees});
     
    }
     catch(err){
        console.log(err);
        res.send({message:err});
    }
}

async function allEmployees(req,res){
    try{
        let employees=await employeeModel.find({}).select('_id employeeName');
        res.send({message:'successfully sent',employees:employees})
    }
    catch(err){
        console.log(err);
        res.send({message:err});
    }
}

async function getEmployee(req,res){
    try{
        let employee=req.body;

        let emploeeObj=await employeeModel.find({employeeName:employee.employeeName}).populate('Events','',eventModel);

        res.send({message:'sent',emploeeObj:emploeeObj})
    }
    catch(err){
        console.log(err);
        res.send({message:err});
    }

}


async function pagination(req,res){

    let paginateObj=req.body;
    let employee = await employeeModel.findOne({ email: paginateObj.email }).populate('Events',null,eventModel)
    
    let events=employee.Events;
    let start=paginateObj.limit*(paginateObj.page-1);
    let end=paginateObj.limit*paginateObj.page;

    res.send({events:events.slice(start,end)});

}
module.exports={addEmployee,allEmployees,getEmployee,pagination}