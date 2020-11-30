const express = require('express');
const app = express(); //use express

const spaceshipRoutes = require('./api/routes/spaceship');

app.use('/spaceship', spaceshipRoutes);

app.use((req, res, next) => {
    res.status(200).json({
        message: "Message received"
    })
})

module.exports = app;