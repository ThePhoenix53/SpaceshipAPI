//Imports
const express = require('express')
const router = express.Router();

//GET request handeler
//Get all the locations on the system
router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: "Handeling GET for location"
    });
});

//POST request handler
//Make a new location
router.post('/', (req, res, next) =>{
    res.status(201).json({
        message: "Handeling POST for location"
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