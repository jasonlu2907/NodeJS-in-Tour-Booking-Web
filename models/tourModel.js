const mongoose = require('mongoose');

// Create Schema
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Tour needs a name'],
      unique: true,
      trim: true
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have duration']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty']
    },
    rating: {
        type: Number,
        default: 4.5
    },
    ratingQuantity: {
      type: Number,
      default: 4.5
    },
    ratingAverage: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'Tour needs a price']
    },
    priceDiscount: {
      type: Number,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    // Array of string
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    // Different start dates in 1 tour for example
    startDates: [Date]
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
