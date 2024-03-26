const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach.js')
/* Get coaches page. */
router.get('/', (req, res) => {
    res.render('coach.hbs', { coaches: Coach.all() });
});
router.get('/bio', (req, res) => {

    let coach = Coach.all();
    res.render('coach.hbs', { coaches: coach, coach: user});
});

module.exports = router;