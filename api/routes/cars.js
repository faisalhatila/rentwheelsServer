// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const nodemailer = require('nodemailer');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination : (req, file, cb) => {
//         cb(null,'./uploads/')
//     },
//     filename : (req, file, cb) => {
//         cb(null,Date.now() + file.originalname);
//     }
// })

// const upload = multer({
//     storage : storage,
//     limits : {
//     fileSize : 1024 * 1024 * 5
//     },
//     // fileFilter : fileFilter,
// })

// const RegisterDriver = require('../models/registerDriver');

// router.post('/',upload.array('documents',4),(req,res,next) => {
//     console.log(req.file);
//     const registerDriver = new RegisterDriver({
//         _id : new mongoose.Types.ObjectId(),
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         contact: req.body.contact,
//         email: req.body.email,
//         address: req.body.address,
//         city: req.body.city,
//         carName: req.body.carName,
//         carModelYear: req.body.carModelYear,
//         documents : req.files.map(path => {
//             return path.path.toString();
//         }),
//         documents : req.files.map(path => {
//             return path.path.toString();
//         }),
//         documents : req.files.map(path => {
//             return path.path.toString();
//         }),
//         documents : req.files.map(path => {
//             return path.path.toString();
//         }),
//     });
//     registerDriver
//     .save()
//     .then(result => {
//         console.log(result);
//         res.status(201).json({
//             message : 'Registered Driver Succcessfully',
//             registeredDriver : {
//                 _id : result._id,
//                 firstName : result.firstName,
//                 lastName : result.lastName,
//                 carName : result.carName,
//                 carModelYear : result.carModelYear,
//                 contact : result.contact,
//                 // price : result.price,
//                 path : result,
//                 request : {
//                     type : 'GET',
//                     url : "http://localhost:5000/products/" + result._id
//                 }
//             },
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error : err
//         })
//     })
//     //Email Setting & Sending
//     var transporter = nodemailer.createTransport({
//         service : 'outlook',
//         auth : {
//             user : 'hatilas1994@outlook.com',
//             pass : '03073641656F',
//         }
//     })
//     var mailOptions = {
//         from : 'hatilas1994@outlook.com',
//         to : 'hatilas1994@gmail.com',
//         subject : 'New Ride Request',
//         html : `<div>
//                     <ul>
//                         <li>${registerDriver.firstName} ${registerDriver.lastName}</li>
//                         <li>${registerDriver.address}</li>
//                         <li>${registerDriver.city}</li>
//                         <li>${registerDriver.contact}</li>
//                         <li>${registerDriver.carName}</li>
//                         <li>${registerDriver.carModelYear}</li>
//                     </ul>
//                 </div>`
//     }
//     transporter.sendMail(mailOptions,(error,info) => {
//         if(error) {
//             console.log(error);
//         }
//         else {
//             console.log(`Email Sent ${info.message}`);
            
//         }
//     })
// });

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Cars = require('../models/cars');
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null,'./cars/')
    },
    filename : (req, file, cb) => {
        cb(null,Date.now() + file.originalname);
    }
})

const upload = multer({
    storage : storage,
    limits : {
    fileSize : 1024 * 1024 * 5
    },
    // fileFilter : fileFilter,
})

// Handling Post Request
router.post('/',upload.single('carImage'),(req,res,next) => {
    const cars = new Cars({
        _id : new mongoose.Types.ObjectId(),
        carName: req.body.carName,
        carModelYear: req.body.carModelYear,
        space: req.body.space,
        cost: req.body.cost,
        category : req.body.category,
    });
    console.log(cars);
    cars
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message : 'Car Inserted Successfully',
            cars : {
                _id : result._id,
                carName : result.carName,
                carModelYear : result.carModelYear,
                sapce : result.sapce,
                cost : result.cost,
                carImage : result.carImage,
                category : result.category,
                // price : result.price,
                path : result,
                request : {
                    type : 'GET',
                    url : "http://localhost:5000/products/" + result._id
                }
            },
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
});

// Handling Get Request

router.get('/',(req,res,next) => {
    Cars.find()
    .select('_id name carModelYear space carName cost')
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            rideRequest : docs.map(doc => {
                return {
                    _id : doc._id,
                    carName : doc.carName,
                    carModelYear : doc.carModelYear,
                    cost : doc.cost,
                    space : doc.space,
                    // status : doc.status,
                    request : {
                        type : 'GET',
                        url : 'http://localhost:5000' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
});

// router.patch('/:rideRequestId',(req,res,next) => {
//     const id = req.params.rideRequestId;
//     const updateOps = {};
//     for(const ops of req.body){
//         updateOps[ops.propName] = ops.value; 
//     }
//     RideRequest.update({_id : id}, {$set : updateOps})
//     .exec()
//     .then(result => {
//         res.status(200).json({
//             message : 'Status Updated',
//             request : {
//                 type : 'GET',
//                 url : "http://localhost:5000/rideRequest/"+id
//             }
//         })
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error : err
//         })
//     })
// })

module.exports = router;

