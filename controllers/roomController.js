const roomModel = require('./../models/roomModel').roomModel;
const eventModel = require('./../models/EventsModel').eventModel;


async function addRoom(req, res) {
    try {
        let roomObj = req.body.roomObj;
        roomObj = JSON.parse(roomObj);
        roomObj['image'] = req.file.path;
        // console.log(roomObj);
        let obj = await roomModel.findOne({ roomName: roomObj.roomName });
        // console.log(obj)
        if (obj !== null) {
            res.send({ message: 'room name already exist' });
            return;
        }
        await roomModel.create(roomObj);
        res.send({ message: 'created successfully' })
    }
    catch (err) {
        console.log(err);
        res.send({ message: err });
    }
}

async function allrooms(req, res) {
    try {
        let allrooms = await roomModel.find({})
        res.send({ message: "success", rooms: allrooms })
    }
    catch (err) {
        console.log(err);
        res.send({ message: err });
    }
}

async function updateRoom(req, res) {
    try {
        let roomObj = req.body;
        let prevRoomObj = await roomModel.findOne({ _id: roomObj._id });
        if (prevRoomObj.roomName === roomObj.room.roomName) {
            await roomModel.findOneAndUpdate({ _id: roomObj._id }, roomObj.room);
            res.send({ message: 'updated successfully' })
        }
        else {
            let rooms = await roomModel.find({ roomName: roomObj.room.roomName });
            let count = rooms.length;
            if (count == 1) {
                res.send({ message: 'room name already existing' })
            }
            else {
                await roomModel.findOneAndUpdate({ _id: roomObj._id }, roomObj.room);
                res.send({ message: 'updated successfully' })
            }
        }
    }
    catch (err) {
        console.log(err);
        res.send({ message: err });
    }
}

async function roomSpecificAccess(req, res) {
    try {
        let obj = req.body;

        let rooms = await roomModel.find({ access: { $in: [obj.role] } });

        res.send({ message: 'sent', rooms: rooms });
    }
    catch (err) {
        console.log(err);
        res.send({ message: err });
    }

}

async function filterByType(req, res) {
    try {
        let filterObj = req.body;

        let rooms = await roomModel.find(filterObj);

        res.send({ message: 'sent', rooms: rooms });
    }
    catch (err) {
        console.log(err);
        res.send({ message: err });
    }

}

async function roomEvents(req, res) {
    try {
        let filterObj = req.params;

        let rooms = await roomModel.findOne(filterObj);

        let events = await eventModel.find({ room: rooms._id }).populate('host').populate("room");

        res.send({ message: 'sent', events: events });
    }
    catch (err) {
        console.log(err);
        res.send({ message: err });
    }

}

module.exports = { addRoom, allrooms, updateRoom, roomSpecificAccess, filterByType, roomEvents }
