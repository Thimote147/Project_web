const express = require('express');
const router = express.Router();

/* GET user page. */
router.get('/', (req, res) => {
    res.render('user.hbs');
});

module.exports = router;