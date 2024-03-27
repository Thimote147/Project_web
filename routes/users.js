const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

/* GET user page. */
router.get('/', (req, res) => {
    res.render('user.hbs');
});

/* GET user login page. */
router.get('/login', (req, res) => {
    res.render('user.hbs', { form: "login" });
});

/* POST login a user */
router.post("/login/auth", (req, res) => {
    if (bcrypt.compareSync(req.body.password, User.login(req.body.email))) {
        req.session.connected = true;
        req.session.user = User.data(req.body.email);
        res.redirect("/");
    } else {
        res.redirect("/users/login");
    }
});

/* GET user register page. */
router.get('/register', (req, res) => {
    res.render('user.hbs', { form: "register" });
});

/* POST create a user */
router.post("/register/add", (req, res) => {
    User.register(req.body.firstname, req.body.surname, req.body.email, bcrypt.hashSync(req.body.password, 10), req.body.is_coach);
    res.redirect("/users/login");
});

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;