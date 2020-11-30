const express = require('express');
const app = express(); //use express
const morgan = require('morgan');

const spaceshipRoutes = require('./api/routes/spaceship');
const locationRoutes = require('./api/routes/location');

app.use(morgan('dev'));

//Request handeling routes
app.use('/spaceship', spaceshipRoutes);
app.use('/location', locationRoutes);

app.use((req, res, next) => {
    res.status(200).json({
        message: "Message received"
    })
})

module.exports = app;