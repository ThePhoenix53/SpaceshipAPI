const express = require('express');
const app = express(); //use express
const morgan = require('morgan');

const spaceshipRoutes = require('./api/routes/spaceship');
const locationRoutes = require('./api/routes/location');

app.use(morgan('dev'));

//Request handeling routes
app.use('/spaceship', spaceshipRoutes);
app.use('/location', locationRoutes);


//Handle all other request
app.use((req, res, next) =>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

//Error Handeling
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;