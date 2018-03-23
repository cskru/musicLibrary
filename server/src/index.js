/**
 * Created by kruthis on 05-Mar-18.
 */

"use strict";

const express = require('express');
let http = require('http');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const config = require('../config/config.json');
const hostAndPort = config.host + ":" + config.port;
let app = express();
let httpServer = http.createServer(app);

//const musicLibraryDbOperation = require('./rest/db/musicDb.js').musicLibraryDbOperation;

// DB
/*const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/musiclibrary');
const db = mongoose.connection;
db.on('error', err => new Error(err));
let trackSchema = new mongoose.Schema({
    id: String,
    name: String,
    movie: String,
    gaanaLink: String,
    youtubeLink: String,
    luvIt: Boolean,
    playlistIds: Array
});
//let Track = mongoose.model('Track', trackSchema);
var Track = 1;
console.log(Track);*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/rest', require('./rest/api/index'));
app.use('/rest/employee', require('./rest/api/employee'));
app.use('/rest/music', require('./rest/api/music'));
app.use('/', function (req, res, next) {
    res.send("Welcome");
});

httpServer.listen(config.port, function () {
    console.log('Server listening on '+hostAndPort);
});

module.exports = {
    //mongoose,
    //Track
};