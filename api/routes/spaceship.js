//Imports
const express = require('express')
const router = express.Router();

//GET Request Handeler
//Returns all space ships
router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: "Handeling GET for spaceship"
    });
});

//POST Request Handeler
//Builds new space ship
router.post('/', (req, res, next) =>{
    res.status(201).json({
        message: "Handeling POST for spaceship"
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