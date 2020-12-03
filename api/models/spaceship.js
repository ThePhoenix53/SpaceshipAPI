const mongoose = require('mongoose')

//Schema for spaceship model
const spaceshipSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    model: {type: String, required: true},
    location: {type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true},//mongoose.Schema.Types.ObjectId,
    status: {type: String, required: true},
})

module.exports = mongoose.model('Spaceship', spaceshipSchema)