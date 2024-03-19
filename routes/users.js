const express = require('express');
const router = express.Router();
/* GET user page. */
router.get('/', (req, res) => {
    res.render('user.hbs');
});


/* GET user login page. */
router.get('/login', (req, res) => {
    const login = "<form action=\"/users/login/verification\" method=\"post\"><label for= \"email\" > Username :</label><input type=\"email\" name=\"email\"><label for=\"password\">Password :</label><input type=\"password\" name=\"password\"><button type=\"submit\" > login</button></form>";
    res.render('user.hbs', { form: login });
});

/* GET user register page. */
router.get('/register', (req, res) => {
    const register = "<form action=\"/users/register/add\" method=\"post\"><label for= \"firstname\" > Firstname :</label><input type=\"text\" name=\"firstname\"><label for= \"surname\" > Surname :</label><input type=\"text\" name=\"surname\"><label for= \"email\" > Email :</label><input type=\"email\" name=\"email\"><label for=\"password\">Password :</label><input type=\"password\" name=\"password\"><label for=\"confirmation\">Confirmation :</label><input type=\"password\" name=\"confirmation\"><button type=\"submit\" > login</button></form>";
    res.render('user.hbs', { form: register });
});

module.exports = router;