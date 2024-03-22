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
    const login = `<form action="/users/login/auth" method="post">
                        <div>
                            <label for= "email">Email : </label>
                            <input type="email" name="email">
                        </div>
                        <div>
                            <label for="password">Password : </label>
                            <input type="password" name="password">
                        </div>

                        <button type="submit">login</button>
                    </form>`;
    res.render('user.hbs', { form: login });
});

/* POST login a user */
router.post("/login/auth", (req, res) => {
    if (bcrypt.compareSync(req.body.password, User.login(req.body.email))) {
        req.session.connected = true;
        res.redirect("/");
    } else {
        res.redirect("/users/login");
    }
});

/* GET user register page. */
router.get('/register', (req, res) => {
    const register = `<form action="/users/register/add" method="post">
                            <div>
                                <label for= "firstname">Firstname : </label>
                                <input type="text" name="firstname">
                            </div>
                            <div>
                                <label for= "surname">Surname : </label>
                                <input type="text" name="surname">
                            </div>
                            <div>
                                <label for= "email">Email : </label>
                                <input type="email" name="email">
                            </div>
                            <div>
                                <label for="password">Password : </label>
                                <input type="password" name="password">
                            </div>
                            <div>
                                <label for="confirmation">Confirmation : </label>
                                <input type="password" name="confirmation">
                            </div>

                            <button type="submit">register</button></form>`;
    res.render('user.hbs', { form: register });
});

/* POST create a user */
router.post("/register/add", (req, res) => {
    User.register(req.body.firstname, req.body.surname, req.body.email, bcrypt.hashSync(req.body.password, 10));
    res.redirect("/users/login");
});

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;