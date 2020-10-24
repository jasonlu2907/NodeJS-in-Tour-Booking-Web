// const express = require('express');
const { query } = require("express");
const Tour = require(`./../models/tourModel`);

/**Array of JavaScript object */
// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// ); Dont need it since we use DB now

/**Dont need it since start working with MongoDB */
// exports.checkId = (req, res, next, val) => {
//     console.log(`You selected tour id: ${val}`);

//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             messages: 'Invalid ID'
//         });
//     }
//     next();
// };

exports.checkBody = (req, res, next) => {
    if (!req.body.price || !req.body.name) {
        return res.status(400).json({
            status: 'fail',
            messages: 'Missing name or price'
        });
    }
    next();
};

// 2) ROUTE HANDLES
exports.getAllTours = async (req, res) => {
  try {
    /**BUILD QUERY */
    // assign req.query to another var but have to use ... method
    // if not, if we change queryObj -> also change req.query
    const queryObj = {...req.query};
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // Delete nhung query ko can thiet
    // Vi du ?difficulty=easy&page=2 nhưng page ko có trong data
    // -> tự ignore
    excludedFields.forEach(el => delete queryObj[el]);
    // console.log(req.query);

    // We now recognize những gì trong req.query na ná với cách 1. Filter
    const query = Tour.find(queryObj); // dung req.query doan nay ko dc nua
    /**2ways writing DB queries. 1: Filter  method 2: Mongoose methods */
    // const query = Tour.find({duration: '5', difficulty: 'easy'});
    // const query = Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy')
  
    /**EXECUTE QUERY */
    const tours = await query;

    /**SEND RESPONSE */
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    });

  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// Ví dụ vô thử 1 trang hàng cụ thể có id = ...
exports.getTour = async (req, res) => {
    // console.log(req.params);

    /*const id = req.params.id * 1; // Hoặc dùng parseInt để chuyển sang số
    const tour = tours.find((el) => el.id === id);

    if(id > tours[tours.length-1].id)
    if(!tour) {
      res.status(404).json({
          status: 'fail',
          messages: 'Data not found'
      })
    };*/

    try {
      const tour = await Tour.findById(req.params.id);
      // shorthand of Tour.findOne({ _id: req.params.id })

      res.status(200).json({
        status: 'success',
        data: {
            tour
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
};

exports.createTour = async (req, res) => {
  try {
    // Cách 1: dùng save+then
    // const newTour = new Tour({}).save().then()

    // Create function return a Promise
    const newTour = await Tour.create(req.body);
    res.status(202).json({
      status: 'success',
      data: {
        tour : newTour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }

    // USE MIDDLEWARE TO ACCESS TO THE BODY OF THE REQUEST
    // console.log(req.body);

    /*  
    const newID = tours[tours.length - 1].id + 1;
    const newTour = { id: newID, ...req.body };

    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        () => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        }
    );
    */

    // CAN'T HANDLE TWO RESPONSES.send AT THE SAME TIME
    // res.send("Done");
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      // doc Mongoose document for this option
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
          tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
