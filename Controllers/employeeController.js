//importing employee model
const employeeModel=require('./../Models/employeeModel').employeeModel
const eventModel=require('./../Models/EventsModel').eventModel

async function addEmployee(req,res){
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

async function allEmployees(req,res){
    let employees=await employeeModel.find({}).select('_id employeeName');
    res.send({message:'successfully sent',employees:employees})
}

async function getEmployee(req,res){
    let employee=req.body;

    let emploeeObj=await employeeModel.find({employeeName:employee.employeeName}).populate('Events','',eventModel);

    res.send({message:'sent',emploeeObj:emploeeObj})

}

module.exports={addEmployee,allEmployees,getEmployee}