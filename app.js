const fs = require('fs');
const express = require('express');

const app = express();

// MIDDLEWARE
app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200).send('Hello from the server side');
// })

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Hello from the server side',
//         user: 'dumamay'
//     });
// })

// app.post('/', (req, res) => {
//     res.status(200).send('Hello from the server side');
// })

/**Array of JavaScript object */
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    });
});

// Ví dụ vô thử 1 trang hàng cụ thể có id = ...
app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
    console.log(`Application running on port ${port}...`);
})