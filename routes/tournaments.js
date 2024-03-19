const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament.js')

/* GET tournaments page. */
router.get('/', (req, res) => {
    res.render('tournament.hbs', { tournaments: Tournament.all() });
});

/* GET tournament information page. */
router.get('/details', (req, res) => {
    res.render('tournament.hbs', { tournaments: Tournament.all(), tournament: Tournament.findById(req.query.id) });
});

/* GET tournament creation page. */
router.get('/creation', (req, res) => {
    res.render('tournament.hbs');
});

/* POST new tournament. */
router.post("created", (req, res) => {
    res.redirect("/tournaments")
});

module.exports = router;