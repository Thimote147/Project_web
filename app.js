const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const hbs = require('hbs');
const session = require('express-session');

/**
 * eq checks if value are equal
 */
hbs.registerHelper('eq', function (a, b) {
  if (a === b) {
    return true;
  }
  else {
    return false;
  }
});

/**
 * neq checks if value are not equal
 */
hbs.registerHelper('neq', function (a, b) {
  if (a !== b) {
    return true;
  }
  else {
    return false;
  }
});

// TODO Require your controllers here
const indexRouter = require("./routes/index.js");
const usersRouter = require("./routes/users.js");
const tournamentsRouter = require("./routes/tournaments.js");
const courtsRouter = require("./routes/courts.js");
const coachesRouter = require("./routes/coaches.js");

const app = express();
const port = 3000;

// Setup views folder and handlebar engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev')); // Log each request
app.use(express.urlencoded({ extended: false })); // Decode form values
app.use(express.static(path.join(__dirname, 'public'))); // Get static files from public folder

app.use(session({ secret: "Your secret key", resave: false, saveUninitialized: false }));
app.use(function (req, res, next) { res.locals.session = req.session; next(); });

// TODO Call your controllers here
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tournaments", tournamentsRouter);
app.use("/courts", courtsRouter);
app.use("/coaches", coachesRouter);


// Create error on page not found
app.use((req, res, next) => next(createError(404)));

// Show error hbs page
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.render('error', { error });
});

// Launch server
app.listen(port, () => console.log('App listening on port ' + port));
