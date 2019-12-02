const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const RideRequest = require('../models/rideRequest');
// const RegisterDriver = require('../models/registerDriver');

// Handling Get Request
router.post('/',(req,res,next) => {
    const rideRequest = new RideRequest({
        _id : mongoose.Types.ObjectId(),
        name : req.body.name,
        contact : req.body.contact,
        email : req.body.email,
        address : req.body.address,
        city : req.body.city,
        date : req.body.date,
        noOfDays : req.body.noOfDays,
        car : req.body.car,
        cost : req.body.cost,
        reasonOfBooking : req.reasonOfBooking,
        status : 'pending',
    });
    rideRequest
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message : 'Request Submitted Successfully',
            submittedRequest : {
                _id : result.id,
                name : result.name,
                contact : result.contact,
                cost : result.cost,
                status : res.status
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
    //Email Setting & Sending
    var transporter = nodemailer.createTransport({
        service : 'outlook',
        auth : {
            user : 'hatilas1994@outlook.com',
            pass : '03073641656F',
        }
    })
    var mailOptions = {
        from : 'hatilas1994@outlook.com',
        to : 'hatilas1994@gmail.com',
        subject : 'New Ride Request',
        html : `<div>
                    <ul>
                        <li>${rideRequest.name}</li>
                        <li>${rideRequest.address}</li>
                        <li>${rideRequest.city}</li>
                        <li>${rideRequest.contact}</li>
                        <li>${rideRequest.cost}</li>
                    </ul>
                </div>`
    }
    transporter.sendMail(mailOptions,(error,info) => {
        if(error) {
            console.log(error);
        }
        else {
            console.log(`Email Sent ${info.message}`);
            
        }
    })
});

// Handling Get Request

router.get('/',(req,res,next) => {
    RideRequest.find()
    .select('_id name address contact cost status')
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            rideRequest : docs.map(doc => {
                return {
                    _id : doc._id,
                    name : doc.name,
                    address : doc.address,
                    contact : doc.contact,
                    cost : doc.cost,
                    status : doc.status,
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

router.patch('/:rideRequestId',(req,res,next) => {
    const id = req.params.rideRequestId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value; 
    }
    RideRequest.update({_id : id}, {$set : updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message : 'Status Updated',
            request : {
                type : 'GET',
                url : "http://localhost:5000/rideRequest/"+id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})

module.exports = router;

