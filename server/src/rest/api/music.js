/**
 * Created by kruthis on 14-Mar-18.
 */
"use strict";
const router  = require('express').Router();
const uuid = require('uuid/v1');

//const musicLibraryDbOperation = require('../db/musicDb.js').musicLibraryDbOperation;

let dbTracks = []; //Array for now. Will implement db later
let dbPlaylists = []; //Array for now. Will implement db later
let track; // A global temp variable
let playlist; // A global temp variable

//Constructor for track
function Track(options) {
    this.id = uuid();
    this.name = options.name;
    this.movie = options.movie;
    this.gaanaLink = options.gaanaLink;
    this.youtubeLink = options.youtubeLink;
    this.luvIt = options.luvIt;
    this.playlistIds = options.playlistIds;
}

const trackExists = async (trackId) => {
    return (
        dbTracks.map(ele => ele.id).indexOf(trackId) === -1
    );
};

//Constructor for playlist
function Playlist(options) {
    this.id = uuid();
    this.name = options.name;
    this.trackIds = options.trackIds;
}

const playlistExists = async (playlistId) => {
      return (
        dbPlaylists.map(ele => ele.id).indexOf(playlistId) === -1
      );
};

const addTracksToPlaylist = async(playlistId, tracks) => {
    return new Promise((resolve, reject) => {
        dbPlaylists.forEach(playlist => {
            if(playlist.id === playlistId) {
                playlist.trackIds = playlist.trackIds.concat(tracks);
                resolve(dbPlaylists);
            }
        })
    })
};

const addTrackToPlaylists = async (playlistIds, trackId) => {
    let index;
    return new Promise((resolve, reject) => {
        for(let i = 0; i < playlistIds.length; i++) {
            index = (dbPlaylists.map(ele => ele.id).indexOf(playlistIds[i]))
            dbPlaylists[index].trackIds.push(trackId);
        }
        resolve();
    })
};

// Add track
router.post('/track', async function (req, res, next) {

    track = new Track(req.body);
    dbTracks.push(track); // Store it in db
    //await musicLibraryDbOperation(track);
    await addTrackToPlaylists(track.playlistIds, track.id);
    console.log(dbPlaylists);
    res.send(dbTracks.slice(-1)[0]);
});

// Add tracks to playlist
router.post('/playlist/:playlistId', async function (req, res, next) {
    res.send(await addTracksToPlaylist(req.params.playlistId, req.body));
});

// Add playlist
router.post('/playlist', function (req, res, next) {
    dbPlaylists.push(new Playlist(req.body)); // Store it in db
    res.status(200).json(dbPlaylists.slice(-1)[0]);
});

//GET

// Get track by id
router.get('/track/:trackId', function (req, res, next) {
    track = dbTracks[(dbTracks.map(ele => ele.id).indexOf(req.params.trackId))];
    if(track === undefined)
        res.status(404).send("Track id: "+req.params.trackId+"\nCouldn't find the track");
    res.send(track);
});

// Get playlist by id
router.get('/playlist/:playlistId', function (req, res, next) {
    playlist = dbPlaylists[(dbPlaylists.map(ele => ele.id).indexOf(req.params.playlistId))];
    if(playlist === undefined)
        res.status(404).send("Playlist id: "+req.params.playlistId+"\nCouldn't find the playlist");
    res.send(playlist);
});

// Get all tracks
router.get('/track', function (req, res, next) {
    res.send(dbTracks);
});

// Get all playlists
router.get('/playlists', function (req, res, next) {
    res.send(dbPlaylists);
});

module.exports = router;
