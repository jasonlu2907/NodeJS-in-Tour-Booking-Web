// const express = require('express');
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
    const tours = await Tour.find();
  
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
    })
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

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour..'
        }
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
};
