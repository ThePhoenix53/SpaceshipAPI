const express = require('express');
const app = express(); //use express
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const spaceshipRoutes = require('./api/routes/spaceship');
const locationRoutes = require('./api/routes/location');

//Connecting to Database
mongoose.connect('mongodb+srv://' + process.env.MONGO_ATLAS_UN + ':' + process.env.MONGO_ATLAS_PW +'@node-rest-api.e1o1b.mongodb.net/SANDBOX?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS error handeling
//This is in case of browser usage
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    
    next();
});

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