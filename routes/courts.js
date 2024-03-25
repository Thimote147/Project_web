const express = require('express');
const router = express.Router();
const Court = require('../models/Court.js');

/* GET courts page. */
router.get('/', (req, res) => {
  res.render('court.hbs', { courts: Court.all() });
});

/* GET details court page. */
router.get('/details', (req, res) => {
  res.render('court.hbs', { courts: Court.all(), court: Court.findById(req.query.id) })
});

/* GET booking court page. */
router.get('/booking', (req, res) => {
  if (req.session.user !== undefined) {
    res.render('court.hbs', { booking: true });
  } else {
    res.render('user.hbs', { form: 'login' });
  }
});

/* GET court creation page. */
router.get('/creation', (req, res) => {
  res.render('court.hbs', { courts: Court.all(), creation: true })
});

/* POST created court page. */
router.post("/created", (req, res) => {
  const location = req.body.street + " " + req.body.number + ", " + req.body.zipcode + " " + req.body.city + ", " + req.body.country;
  const picture = "../images/courts/" + req.body.picture;
  Court.add(req.body.name, req.body.flooring, location, picture);
  res.redirect("/courts");
});

/* GET court update page. */
router.get('/update', (req, res) => {
  console.log(Court.findById(req.query.id));
  res.render('court.hbs', { courts: Court.all(), update: true, court: Court.findById(req.query.id) })
});

/* POST updated court. */
router.post("/updated", (req, res) => {
  res.redirect("/court/details?id=" + req.body.id);
});

module.exports = router;
