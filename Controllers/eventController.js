const eventModel=require('./../Models/EventsModel').eventModel

async function AddEvents(req,res){
    let eventObj=req.body;

    let checkEvent=await eventModel.find({start_time:eventObj.start_time,end_time:eventObj.end_time,room:eventObj.room});

    if(checkEvent!==null)
    {
        res.send({message:"Room already booked"});
        return;
    }
    await eventModel.create(eventObj);

    res.send({message:"Event Booked Successfully!!"});

}

async function CancelEvent(req,res){
    let eventObj=req.body;

    let checkEvent=await eventModel.find({start_time:eventObj.start_time,end_time:eventObj.end_time,room:eventObj.room});

    if(checkEvent===null)
    {
        res.send({message:"Event Not found"});
        return;
    }
    
    await eventModel.find({_id:eventObj._id},{$set:{status:'cancelled'}});

    res.send({message:"Event cancelled Successfully!!"});

}

async function FilterEvent(req,res){
    let fliterObj=req.fliter;

    let filteredEvents=await eventModel.find({_id:eventObj._id,filterObj});

    res.send({message:"sent",filters:filteredEvents});

}


async function AllEvents(req,res){
    
    let events=await eventModel.find({});

    res.send({message:'sent',Events:events})
}

async function LiveEvents(req,res){

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const now = new Date();
    
    let events =await eventModel.find({
        start_time: { $gte: startOfDay },
        end_time: { $gte: now },
        status: 'booked'
    })
    .populate('host')
    .populate('room')
    .exec();

    res.send({message:'sent',liveEvents:events})
    
}


module.exports={AllEvents,LiveEvents,AddEvents,CancelEvent,FilterEvent}