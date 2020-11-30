//Imports
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Spaceship = require('../models/spaceship')

//GET Request Handeler
//Returns all space ships
router.get('/', (req, res, next) =>{
    Spaceship.find({})
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500)
    });
    
});

//POST Request Handeler
//Builds new space ship
router.post('/', (req, res, next) =>{
    const spaceship = {
        name: req.body.name,
        model: req.body.model,
        location: req.body.location,
        status: req.body.status
    }
    res.status(201).json({
        message: "Handeling POST for spaceship",
        createdSpaceship: spaceship
    });
});

//GET request handler for spaceships
//retuns single spaceship infomation
router.get('/:spaceshipId', (req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message: "Handeling GET for spaceship: " + id
    });
});

//PATCH request handler
//update the status of a single ship
router.patch('/:spaceshipId', (req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message: "Handeling PATCH for spaceship: " + id
    });
});

//DELETE request handeler
//delete spaceship from database
router.delete('/:spaceshipId', (req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message: "Handeling DELETE for spaceship: " + id
    });
});

module.exports = router;