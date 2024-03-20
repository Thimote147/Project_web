const express = require("express");
const router = express.Router();

/* GET courts page. */
router.get("/", (req, res) => {
  res.render("court.hbs");
});

/* GET booking court page. */
router.get("/booking", (req, res) => {
  res.render("court.hbs", { booking: true });
});

module.exports = router;
