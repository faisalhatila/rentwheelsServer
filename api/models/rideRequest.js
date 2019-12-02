const mongoose = require('mongoose');

const rideRequest = mongoose.Schema({
    
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type : String,
        required : true,
    },
    contact : {
        type : Number,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true,
    },
    noOfDays : {
        type : Number,
        required : true,
    },
    car : {
        type : String,
        required : true,
    },
    cost : {
        type : Number,
        required : true 
    },
    reasonOfBooking : {
        type : String,
        required : true 
    },
    status : {
        type : String
    }
})

module.exports = mongoose.model('RideRequest',rideRequest);