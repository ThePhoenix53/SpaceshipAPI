const express = require('express');
const app = express(); //use express

app.use((req, res, next) => {
    res.status(200).json({
        message: "Message received"
    })
})

module.exports = app;