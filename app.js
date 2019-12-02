const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const rideRequest = require('./api/routes/rideRequest')
const registerDriver = require('./api/routes/registerDriver')
const cars = require('./api/routes/cars')
// const orderRoutes = require('./api/routes/orders');
// const userRoutes = require('./api/routes/user');
mongoose.connect(
    'mongodb+srv://faisal123:' +
     process.env.MONGO_ATLAS_PW + 
     '@rentwheelspak-vg6ms.mongodb.net/test?retryWrites=true&w=majority', 
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
)

mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use('/cars',express.static('cars'));
app.use(bodyParser.urlencoded({urlencoded : false, extended : true}));
app.use(bodyParser.json());

// Handle CORS Error
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes Which Handle Request
app.use('/rideRequest',rideRequest);
app.use('/registerDriver',registerDriver);
app.use('/cars',cars);
// app.use('/orders', orderRoutes);
// app.use('/user', userRoutes);

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message,
        }
    })
})

module.exports = app;