const express = require('express');

// const tourController = require('../controllers/tourController');
const tourController = require(`./../controllers/tourController`);

// thay vì dùng app.route thì tạo cái này rồi dùng cái này lun
const tourRouter = express.Router();

// BỞI VÌ PARAM BH CHỈ CÓ id
tourRouter.param('id', tourController.checkId);

tourRouter
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);

tourRouter
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = tourRouter;
