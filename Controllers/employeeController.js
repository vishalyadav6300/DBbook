//importing employee model
const employeeModel=require('./../Models/employeeModel').employeeModel


async function addEmployee(req,res){
    let employeeObj=JSON.parse(req.body.employeeObj);
    // console.log(req.body);
    // console.log(employeeObj);
    // console.log(req.file.path);
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
    let employees=await employeeModel.find({});
    res.send({message:'successfully sent',employees:employees})
}

module.exports={addEmployee,allEmployees}