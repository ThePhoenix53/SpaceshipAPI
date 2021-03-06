//Imports
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Spaceship = require('../models/spaceship');
const Location = require('../models/location');

//Used for status validation
const stringStatus = ["decommissioned", "maintenance", "operational"];

//GET Request Handeler
//Returns all space ships
router.get('/', (req, res, next) =>{
    //Check if location is given
    if (req.body.location) {
        //Find spaceships in a location
        Spaceship.find({location: req.body.location}, 'name model _id location status')
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
            res.status(500).json({error: err});
        });
    } else {
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
    }
});

//POST Request Handeler
//Builds new space ship
router.post('/', (req, res, next) =>{
    //First Check that the location exists
    Location.findById(req.body.location)
    .then(location => {
        if (!location) {
            throw new Error(res.status(404).json({
                message: "Location not found"
            }));
        } else {
            //Then check how many spaceships are at that location
            Spaceship.find({location: location._id}).exec()
            .then(spaceshipsFound => {
                if (spaceshipsFound.length >= location.capacity){
                    throw new Error(res.status(400).json({message: "Location full"}));
                }
            })
            .catch(err => {
                if (!res.writableEnded){
                    res.status(500).json({
                        error: err
                    })
                }
            });
        }
        
        //Finally, check if they status is a valid status
        if (!stringStatus.includes(req.body.status)) {
            throw new Error(res.status(400).json({
                message: "Not a valid Status, choose: {operational}{maintenance}{decommissioned}"
            }));
        }

        //Construct spaceship
        const spaceship = new Spaceship({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            model: req.body.model,
            location: req.body.location,
            status: req.body.status
        });

        //Save spaceshit to database
        return spaceship.save()
    })
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
            res.status(500).json({
                error: err
            })
        }
    });
});

//GET request handler for spaceships
//retuns single spaceship infomation
router.get('/:spaceshipId', (req, res, next) =>{
    const id = req.params.spaceshipId

    //Find spaceship by id
    Spaceship.findById(id, 'name model _id location status')
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No vaild entry found for this ID'});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//PATCH request handler
//update the status of a single ship
router.patch('/:spaceshipId/status', (req, res, next) =>{

    //Check if valid status
    if (!stringStatus.includes(req.body.status)) {
        return res.status(400).json({message: "Not a valid Status, choose: {operational}{maintenance}{decommissioned}"});
    }

    //Update status of spaceship
    const id = req.params.spaceshipId
    Spaceship.updateOne({_id: id}, { $set: { status: req.body.status }})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Spaceship is now " + req.body.status,
            request: {
                type: 'GET',
                url: 'http://120.152.21.208/spaceship/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

    //Below is a methode for updating more fields:
    //Needs interable json array in request
    // const updateOps = {};
    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }
    // Product.update({_id: id}, { $set: updateOps}).exec().then().catch();
});

//PATCH request handler
//update the location of the ship
router.patch('/:spaceshipId/travel', (req, res, next) =>{

    //First check if location exists
    Location.findById(req.body.location)
    .then(location => {
        if (!location) {
            throw new Error(res.status(404).json({
                message: "Location not found"
            }));
        } else {
            //Check if capacity is full
            Spaceship.find({location: location._id}).exec()
            .then(spaceshipsFound => {
                if (spaceshipsFound.length >= location.capacity){
                    throw new Error(res.status(400).json({message: "Destination location full"}));
                }
            }).catch(err => {
                if (!res.writableEnded){
                    console.log(err);
                    res.status(500).json({error: err});
                }
            });

            
            const id = req.params.spaceshipId
            //Check if spaceship is opperational
            Spaceship.findById({_id: id}).exec()
            .then(result => {
                if (result && result.status === "operational") {

                    //Update status of spaceship
                    Spaceship.updateOne({_id: id}, { $set: { location: req.body.location }})
                    .exec()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            message: "Spaceship is now in " + location.cityName + ", " + location.planetName,
                            request: {
                                type: 'GET',
                                url: 'http://120.152.21.208/spaceship/' + id
                            }
                        });
                    })
                } else {
                    throw new Error(res.status(400).json({message: "Ship not operational"}));
                }
            }).catch(err => {
                if (!res.writableEnded){
                    console.log(err);
                    res.status(500).json({error: err});
                }
            });
        }
    })
    .catch(err => {
        if (!res.writableEnded){
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
    });
});

//DELETE request handeler
//delete spaceship from database
router.delete('/:spaceshipId', (req, res, next) =>{
    const id = req.params.spaceshipId
    Spaceship.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Spaceship deleted',
            request: {
                type: 'POST',
                url: 'http://120.152.21.208/spaceship/',
                body: {name: 'String', model: 'String', location: 'String', status: 'String'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;