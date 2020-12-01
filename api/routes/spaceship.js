//Imports
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Spaceship = require('../models/spaceship')

//GET Request Handeler
//Returns all space ships
router.get('/', (req, res, next) =>{
    //Find all spaceships in database
    Spaceship.find({}, 'name model _id location status')
    .exec()
    .then(docs => {
        const response = {
            //Format response
            count: docs.length,
            spaceship: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    model: doc.model,
                    location: doc.location,
                    status: doc.status,
                    request: {
                        type: 'GET',
                        url: 'http://120.152.21.208/spaceship/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});

//POST Request Handeler
//Builds new space ship
router.post('/', (req, res, next) =>{
    const spaceship = new Spaceship({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        model: req.body.model,
        location: req.body.location,
        status: req.body.status
    });
    
    spaceship.save()
    .then(result => {
        //Respons to request
        res.status(201).json({
            message: 'Created spaceship successfully',
            createdSpaceship: {
                name: result.name,
                model: result.model,
                location: result.location,
                status: result.status,
            },
            request: {
                type: 'GET',
                url: 'http://120.152.21.208/spaceship/' + result._id
            }
        });
    })
    .catch(err => {
        if (!res.writableEnded){
            res.status(500).json({error: err});
        }
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