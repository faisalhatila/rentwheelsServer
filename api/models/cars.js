const mongoose = require('mongoose');

const cars =mongoose.Schema({
    
    _id : mongoose.Schema.Types.ObjectId,
    carName : {
        type : String,
        required : true,
    },
    carModelYear : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    space : {
        type : Number,
        required : true
    },
    cost : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true,
    },
    carImage : {
        type : String
    }
})

module.exports = mongoose.model('Cars',cars);