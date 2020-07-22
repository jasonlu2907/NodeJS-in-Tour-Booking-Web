const fs = require('fs');
const express = require('express');

/**Array of JavaScript object */
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// 2) ROUTE HANDLES
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    });
};

// Ví dụ vô thử 1 trang hàng cụ thể có id = ...
exports.getTour = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1; // Hoặc dùng parseInt để chuyển sang số
    const tour = tours.find(el => el.id === id);
    
    // if(id > tours[tours.length-1].id)
    if(!tour) {
        res.status(404).json({
            status: 'fail',
            messages: 'Data not found'
        })
    };

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

exports.createTour = (req, res) => {
    // USE MIDDLEWARE TO ACCESS TO THE BODY OF THE REQUEST
    // console.log(req.body);

    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newID}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: success,
            data: {
                tour: newTour
            }
        })
    })

    // CAN'T HANDLE TWO RESPONSES.send AT THE SAME TIME
    // res.send("Done");
};

exports.updateTour = (req, res) => {
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            messages: 'Invalid ID'
        });
    };

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour..'
        }
    });
};

exports.deleteTour = (req, res) => {
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            messages: 'Invalid ID'
        });
    };

    res.status(204).json({
        status: 'success',
        data: null
    });
};