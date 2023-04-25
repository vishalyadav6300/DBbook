const express=require('express');

const eventRoute=express.Router();

const eventController=require('./../Controllers/eventController')

eventRoute.post('/add-event',eventController.AddEvents);

eventRoute.get('/all-events',eventController.AllEvents);

eventRoute.post('/cancel-event',eventController.CancelEvent);

eventRoute.post('/live-events',eventController.LiveEvents);

eventRoute.post('/filter-events',eventController.FilterEvent);

module.exports={eventRoute};
