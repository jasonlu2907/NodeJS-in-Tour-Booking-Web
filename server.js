const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({
    path: './config.env'
});

const DB = process.env.DATABASE.replace(
    `<PASSWORD>`,
    process.env.DATABASE_PASSWORD
);
// console.log(process.env);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`Connection success`);
    });

// Create Schema
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tour needs a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'Tour needs a price']
    }
});
// Programming convention using Uppcase for Model
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: 'Campus Lover',
    rating: 4.4,
    price: 123
});

/**Interact with the DB by coding */
testTour
    .save() // save the Model to the tours collection in DB
    .then((doc) => {
        console.log(doc);
    })
    .catch((err) => {
        console.log('ERROR :', err);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Application running on port ${port}...`);
});
