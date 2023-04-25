const { employeeModel } = require('../Models/employeeModel');

const eventModel = require('./../Models/EventsModel').eventModel

async function AddEvents(req, res) {
    let newEvent = req.body;

    // Check for overlapping events
    eventModel.findOne({
        room:newEvent.room,
        $or: [
            { start_time: { $gte: newEvent.start_time, $lt: newEvent.end_time } }, // start time falls between existing event's start and end time
            { end_time: { $gt: newEvent.start_time, $lte: newEvent.end_time } }, // end time falls between existing event's start and end time
            { $and: [{ start_time: { $lte: newEvent.start_time } }, { end_time: { $gte: newEvent.end_time } }] } // new event's start and end time fully overlaps with existing event's start and end time
        ]}
    )
        .then(existingEvent => {
            if (existingEvent) {
                // Overlapping event found
                res.send({ message: 'Event overlaps with existing event' });
                console.log('Event overlaps with existing event:', existingEvent);
            } else {
                // No overlapping event found, add the new event to the Event model
                eventModel.create(newEvent)
                    .then(async createdEvent => {
                        await employeeModel.updateMany({ _id: { $in: createdEvent.invitees } },
                            { $addToSet: { Events: createdEvent._id } }
                          )
                        res.send({ message: "New event added:" })
                        console.log('New event added:', createdEvent);

                    })
                    .catch(error => {
                        res.send({ message: 'Error adding new event:' })
                        console.error('Error adding new event:', error);
                    });
            }
        })
        .catch(error => {
            res.send({ message: 'Error checking for overlapping events' });
            console.error('Error checking for overlapping events:', error);
        });



}

async function CancelEvent(req, res) {
    let eventObj = req.body;

    let checkEvent = await eventModel.find({ start_time: eventObj.start_time, end_time: eventObj.end_time, room: eventObj.room });

    if (checkEvent === null) {
        res.send({ message: "Event Not found" });
        return;
    }

    await eventModel.find({ _id: eventObj._id }, { $set: { status: 'cancelled' } });

    res.send({ message: "Event cancelled Successfully!!" });

}

async function FilterEvent(req, res) {
    let fliterObj = req.fliter;

    let filteredEvents = await eventModel.find({ _id: eventObj._id, filterObj });

    res.send({ message: "sent", filters: filteredEvents });

}


async function AllEvents(req, res) {

    let events = await eventModel.find({}).populate('room').populate('host');

    res.send({ message: 'sent', Events: events })
}

async function LiveEvents(req, res) {

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


module.exports = { AllEvents, LiveEvents, AddEvents, CancelEvent, FilterEvent }