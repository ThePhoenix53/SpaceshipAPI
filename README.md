# SpaceshipAPI
Coding Challange Spaceship API

## Accsess
To accsess to server for testing or usage use the following link as the baselink:
http://mkohlmann.com/

## Overview 
This API is coded using Nodejs
Packages used: express, body-parser, mongoose, morgan and nodemon

This API is connected to MongoDB Atlas as it Database.

HTTP requests can be made with a JSON body for input. The return type from the server is JSON which can then be implemented into your application.

## Supported Request

*Note this is some basic documentation, more will be added soon.

GET request -> http://mkohlmann.com/spaceship - This will return all the spaceships on the database

GET request -> http://mkohlmann.com/location - This will return all the locations on the database

POST request -> http://mkohlmann.com/spaceship with JSON body - This will create a new spaceship

More documentation to be added after exams


## How to run
This codebase does not have the database longin infomation. This will have to be added when trying to connect to the database.
To run simply execute "node server.js" in a terminal where Nodejs is installed.
