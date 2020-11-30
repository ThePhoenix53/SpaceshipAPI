//Imports
const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: "Handeling GET for spaceship"
    });
});

router.post('/', (req, res, next) =>{
    res.status(201).json({
        message: "Handeling POST for spaceship"
    });
});

router.get('/:spaceshipId', (req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message: "Handeling GET for spaceship: " + id
    });
});

router.patch('/:spaceshipId', (req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message: "Handeling PATCH for spaceship: " + id
    });
});

router.delete('/:spaceshipId', (req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message: "Handeling DELETE for spaceship: " + id
    });
});

module.exports = router;