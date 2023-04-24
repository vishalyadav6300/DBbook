const eventModel=require('./../Models/EventsModel').eventModel

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

async function getUserSpecificEvents(req,res){
    
}

module.exports={AllEvents,LiveEvents}