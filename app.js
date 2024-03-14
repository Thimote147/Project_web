const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const hbs = require('hbs');

// TODO Require your controllers here
const indexRouter = require("./routes/index.js");

const app = express();
const port = 3000;

// Setup views folder and handlebar engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev')); // Log each request
app.use(express.urlencoded({ extended: false })); // Decode form values
app.use(express.static(path.join(__dirname, 'public'))); // Get static files from public folder


// TODO Call your controllers here
app.use("/", indexRouter);


// Create error on page not found
app.use((req, res, next) => next(createError(404)));

// Show error hbs page
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.render('error', { error });
});

// Launch server
app.listen(port, () => console.log('App listening on port ' + port));
