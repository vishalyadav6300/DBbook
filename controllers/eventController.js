const { employeeModel } = require('../models/employeeModel');

const eventModel = require('./../models/EventsModel').eventModel

async function AddEvents(req, res) {

    try{
        let newEvent = req.body;

        try {
            const existingEvent = await eventModel.findOne({
                room: newEvent.room,
                $or: [
                    { start_time: { $gte: newEvent.start_time, $lt: newEvent.end_time } },
                    { end_time: { $gt: newEvent.start_time, $lte: newEvent.end_time } },
                    { $and: [{ start_time: { $lte: newEvent.start_time } }, { end_time: { $gte: newEvent.end_time } }] }
                ]
            });
        
            if (existingEvent) {
                // Overlapping event found
                res.send({ message: 'Event overlaps with existing event' });
                // console.log('Event overlaps with existing event:', existingEvent);
            } else {
                // No overlapping event found, add the new event to the Event model
                const createdEvent = await eventModel.create(newEvent);
                await employeeModel.updateMany({ _id: { $in: createdEvent.invitees } }, { $addToSet: { Events: createdEvent._id } });
                res.send({ message: "New event added:" });
                // console.log('New event added:', createdEvent);
            }
        } catch (error) {
            res.send({ message: 'Error checking for overlapping events' });
            console.error('Error checking for overlapping events:', error);
        }
        
    }
        catch(err){
            console.log(err);
            res.send({message:err});
        }

}

async function CancelEvent(req, res) {
    try{
        let eventObj = req.body;

        let checkEvent = await eventModel.find({ start_time: eventObj.start_time, end_time: eventObj.end_time, room: eventObj.room });
    
        if (checkEvent === null) {
            res.send({ message: "Event Not found" });
            return;
        }
    
        await eventModel.find({ _id: eventObj._id }, { $set: { status: 'cancelled' } });
        res.send({ message: "Event cancelled Successfully!!" });
    
    }
    catch(err){
        console.log(err);
        res.send({message:err});
    }
}

async function FilterEvent(req, res) {
    try{
        let fliterObj = req.fliter;

    let filteredEvents = await eventModel.find({ _id: eventObj._id, filterObj });

    res.send({ message: "sent", filters: filteredEvents });
    }

    catch(err){
        console.log(err);
        res.send({message:err});
    }

}


async function AllEvents(req, res) {
    try{
        let events = await eventModel.find({}).populate('room').populate('host');

    res.send({ message: 'sent', Events: events })
    }

    catch(err){
        console.log(err);
        res.send({message:err});
    }
}

async function LiveEvents(req, res) {

    try{

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const now = new Date();

    let events = await eventModel.find({
        start_time: { $gte: startOfDay },
        end_time: { $gte: now },
        status: 'booked'
    })
        .populate('host')
        .populate('room')
        .exec();

    res.send({ message: 'sent', liveEvents: events })
    }

    catch(err){
        console.log(err);
        res.send({message:err});
    }

}


module.exports = { AllEvents, LiveEvents, AddEvents, CancelEvent, FilterEvent }