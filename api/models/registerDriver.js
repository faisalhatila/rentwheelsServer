const mongoose = require('mongoose');

const registerDriver =mongoose.Schema({
    
    _id : mongoose.Schema.Types.ObjectId,
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
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
    carName : {
        type : String,
        required : true,
    },
    carModelYear : {
        type : Number,
        required : true
    },
    documents : {
        type : Array
    }
})

module.exports = mongoose.model('RegisterDriver',registerDriver);