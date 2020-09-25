const express = require('express');

// const tourController = require('../controllers/tourController');
const tourController = require(`./../controllers/tourController`);

// thay vì dùng app.route thì tạo cái này rồi dùng cái này lun
const tourRouter = express.Router();

/**Dont need it since start working with MongoDB, just an example showing how middleware works */
// BỞI VÌ PARAM BH CHỈ CÓ id
// Check route nào có param co' id
// tourRouter.param('id', tourController.checkId);

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
