const express = require('express');
const router = express.Router();

/* Get courts page. */
router.get('/', (req, res) => {
    res.render('court.hbs');
});

module.exports = router;