const express = require('express');
const router = express.Router();

/* Get coaches page. */
router.get('/', (req, res) => {
    res.render('coach.hbs');
});

module.exports = router;