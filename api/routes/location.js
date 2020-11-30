//Imports
const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: "Handeling GET for location"
    });
});

router.post('/', (req, res, next) =>{
    res.status(201).json({
        message: "Handeling POST for location"
    });
});

router.get('/:planetId', (req, res, next) =>{
    const id = req.params.planetId;
    res.status(201).json({
        message: "Handeling POST for location: " + id
    });
});

router.delete('/:planetId', (req, res, next) =>{
    const id = req.params.planetId;
    res.status(201).json({
        message: "Handeling DELETE for location: " + id
    });
});

module.exports = router;