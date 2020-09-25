const mongoose = require('mongoose');

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

module.exports = Tour;
/*---------- TESTING INTERACT TO DB
const testTour = new Tour({
    name: 'Campus Lover', // Neu bi duplicate name or dont have name -> Error
    rating: 4.4,
    price: 123
});
/**Interact with the DB by coding */
/* 
testTour
    .save() // save the Model to the tours collection in DB
    .then((doc) => {
        console.log(doc);
    })
    .catch((err) => {
        console.log('ERROR :', err);
    }); 
------------*/
