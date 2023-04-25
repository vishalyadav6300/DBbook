const express=require('express');
const { verifyTokenUser } = require('../Middlewares/verifyToken');

const eventRoute=express.Router();

const eventController=require('./../Controllers/eventController')

eventRoute.post('/add-event',verifyTokenUser,eventController.AddEvents);

eventRoute.get('/all-events',eventController.AllEvents);

eventRoute.post('/cancel-event',verifyTokenUser,eventController.CancelEvent);

eventRoute.post('/live-events',verifyTokenUser,eventController.LiveEvents);

eventRoute.post('/filter-events',verifyTokenUser,eventController.FilterEvent);

module.exports={eventRoute};
