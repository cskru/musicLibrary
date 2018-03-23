/**
 * Created by kruthis on 05-Mar-18.
 */

"use strict";
const router  = require('express').Router();

router.get('/exampleRoute', function (req, res, next) {
    console.log('Hit');
    res.send('Hit');
});

module.exports = router;