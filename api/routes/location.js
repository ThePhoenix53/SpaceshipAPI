//Imports
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Location = require('../models/location');

//GET request handeler
//Get all the locations on the system
router.get('/', (req, res, next) =>{
    //Find all locations
    Location.find({}, 'cityName planetName _id capacity')
    .exec()
    .then(docs => {
        const response = {
            //Format response
            count: docs.length,
            location: docs.map(doc => {
                return {
                    _id: doc._id,
                    cityName: doc.cityName,
                    planetName: doc.planetName,
                    request: {
                        type: 'GET',
                        url: 'http://120.152.21.208/location/' + doc._id
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
            //Formatting
            message: 'Created location successfully',
            createdLocation: {
                id: result._id,
                cityName: result.cityName,
                planetName: result.planetName,
                capacity: result.capacity,
                request: {
                    type: 'GET',
                    url: 'http://120.152.21.208/location/' + result._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

//GET request handler
//get details of 1 planet
router.get('/:planetId', (req, res, next) =>{
    const id = req.params.planetId;
    //find planet with id on database
    Location.findById(id, 'cityName planetName _id capacity')
    .exec()
    .then(planet => {
        console.log(planet);
        if (planet) {
            res.status(200).json({
                cityName: planet.cityName,
                planetName: planet.planetName,
                capacity: planet.capacity
            });
        } else {
            //No planet found
            res.status(404).json({message: 'No vaild entry found for this ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});

//DELETE request handler
//delete given location
router.delete('/:planetId', (req, res, next) =>{
    const id = req.params.planetId
    //delete location off the server
    Location.deleteOne({_id: id}).exec()
    .then(result => {
        res.status(200).json({ message: 'Location deleted' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});

module.exports = router;