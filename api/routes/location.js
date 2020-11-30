//Imports
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Location = require('../models/location');

//GET request handeler
//Get all the locations on the system
router.get('/', (req, res, next) =>{
    //find all spaceships
    Location.find({})
    .exec()
    .then(docs => {
        res.status(200).json(docs);   
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});

//POST request handler
//Make a new location
router.post('/', (req, res, next) =>{
    //construct new location
    const location = new Location({
        _id: new mongoose.Types.ObjectId(),
        cityName: req.body.cityName,
        planetName: req.body.planetName,
        capacity: req.body.capacity
    })

    //save new location
    location.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created location successfully',
            createdLocation: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//GET request handler
//get details of one planet
router.get('/:planetId', (req, res, next) =>{
    const id = req.params.planetId;
    res.status(201).json({
        message: "Handeling POST for location: " + id
    });
});

//DELETE request handler
//delete given location
router.delete('/:planetId', (req, res, next) =>{
    const id = req.params.planetId;
    res.status(201).json({
        message: "Handeling DELETE for location: " + id
    });
});

module.exports = router;