const express = require('express');

// const tourController = require('../controllers/tourController');
const tourController = require(`${__dirname}/../controllers/tourController`);

// thay vì dùng app.route thì tạo cái này rồi dùng cái này lun
const tourRouter = express.Router();

tourRouter.route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

tourRouter.route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = tourRouter;