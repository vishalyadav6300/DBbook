const eventmodel = require("../Models/EventsModel").eventModel
const roommodel = require("../Models/roomModel").roomModel
const usermodel = require("../Models/employeeModel").employeeModel


async function dashboard(req, res) {
    const emps = await usermodel.find({})
    const rooms = await roommodel.find({})
    const events = await eventmodel.find({})
    res.send({ emps: emps.length, rooms: rooms.length, events: events.length, message: "success" })
}

async function todayevents(req, res) {
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)

    const endOfToday = new Date()
    endOfToday.setHours(23, 59, 59, 999)

   let events=await eventmodel.find({
        start_time: { $gte: startOfToday, $lt: endOfToday }
    })
        .populate('host')
        .populate('room')
        .populate('invitees')
        .exec()
    res.send({message:"success",events:events})
}
module.exports = { dashboard,todayevents }