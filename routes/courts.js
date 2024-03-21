const express = require('express');
const router = express.Router();
const Court = require('../models/Court.js');

/* GET courts page. */
router.get('/', (req, res) => {
  res.render('court.hbs', { courts: Court.all() });
});

/* GET details court page. */
router.get('/details', (req, res) => {
  console.log(Court.findById(req.query.id));
  res.render('court.hbs', { courts: Court.all(), court: Court.findById(req.query.id) })
});

/* GET booking court page. */
router.get('/booking', (req, res) => {
  res.render('court.hbs', { booking: true });
});

module.exports = router;
