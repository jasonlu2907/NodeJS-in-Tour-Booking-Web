const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');


const app = express();

// 1) MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));


// 3) ROUTES nhưng h đã xử dụng middleware
// với route thế này dùng middle thế này
app.use('/api/v1/tours', tourRouter);
// với route thế kia dùng middle thế kia
app.use('/api/v1/users', userRouter);

// 4) START THE SERVER
module.exports = app;