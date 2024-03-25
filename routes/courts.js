const express = require('express');
const router = express.Router();
const Court = require('../models/Court.js');

const multer = require('multer'); // Need to fix
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const uniquePrefix = date.getFullYear() + '-' + (date.getMonth() + 1) +
      '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() +
      '-' + date.getSeconds();
    cb(null, uniquePrefix + '-' + file.originalname);
  }
})
const upload = multer({ storage: storage });

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
router.post("/created", upload.single("picture"), (req, res) => {
  const location = req.body.street + " " + req.body.number + ", " + req.body.zipcode + " " + req.body.city + ", " + req.body.country;
  const picture = "../images/courts/" + req.body.picture;
  Court.add(req.body.name, req.body.flooring, location, picture);
  res.redirect("/courts");
});

/* GET court update page. */
router.get('/update', (req, res) => {
  console.log(req.session);
  if (req.session.connected && req.session.user.is_coach === 1) {
    const courtInfo = Court.findById(req.query.id)
    const street = courtInfo.location.split(",")[0].split(" ").slice(0, -1).join(",").replace(/,/g, " ");
    const number = courtInfo.location.split(",")[0].split(" ").slice(-1).join();
    const zipcode = courtInfo.location.split(",")[1].split(" ").slice(1, 2).join();
    const city = courtInfo.location.split(",")[1].split(" ").slice(2).join();
    const country = courtInfo.location.split(",")[2].slice(1);

    const sepInfo = { id: courtInfo.id, name: courtInfo.name, flooring: courtInfo.flooring, street: street, number: number, zipcode: zipcode, city: city, country: country, picture: courtInfo.picture };

    res.render('court.hbs', { courts: Court.all(), update: true, court: sepInfo });
  } else {
    res.render('court.hbs', { courts: Court.all(), court: Court.findById(req.query.id) })
  }
});

/* POST updated court. */
router.post("/updated", (req, res) => {
  const location = req.body.street + " " + req.body.number + ", " + req.body.zipcode + " " + req.body.city + ", " + req.body.country;
  const picture = "../images/courts/" + req.body.picture;
  Court.update(req.body.id, req.body.name, req.body.flooring, location, picture);
  res.redirect("/courts/details?id=" + req.body.id);
});

module.exports = router;
