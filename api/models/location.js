const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cityName: {type: String, required: true},
    planetName: {type: String, required: true},
    capacity: {type: Number, required: true},
})

module.exports = mongoose.model('Location', locationSchema);