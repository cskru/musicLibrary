/**
 * Created by kruthis on 19-Mar-18.
 */

const mongoose = require('mongoose');
const Track = require('D:\\ExperimentZone\\dev\\project\\server\\src\\index.js').Track;

const musicLibraryDbOperation = async (track) => {
    let track1 = new Track(track);

    track1.save(function (err, track1) {
        if (err) return console.error(err);
        track1.speak();
    });

    Track.find(function (err, tracks) {
        if (err) return console.error(err);
        console.log(tracks);
    })
};

module.exports = {
    musicLibraryDbOperation
};