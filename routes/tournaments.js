const express = require('express');
const router = express.Router();

/* GET tournaments page. */
router.get('/', (req, res) => {
    res.render('tournament.hbs');
});

module.exports = router;