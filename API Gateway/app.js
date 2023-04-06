const express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

const helmet = require("helmet");
const xssClean = require("xss-clean");
/* ---------------------------------------------------------------
** Configurations
---------------------------------------------------------------- */
// require('./mongoDBconenction.js').openDB();

/* ---------------------------------------------------------------
** Declarations of routes
---------------------------------------------------------------- */
// For nodejs express
var appRoutes = require("./api/routes");

const app = express();

//Routes
app.get("/", (req, res) => {
  res.send("Welcome home!");
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

/* ---------------------------------------------------------------
** Express Setting
---------------------------------------------------------------- */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist")));

//app.use(express.static(path.join(__dirname, '/uploads')));

app.use(helmet());
app.use(xssClean());

// This is required if angular and backend code are

app.use(function (req, res, next) {
  // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

/* ---------------------------------------------------------------
** Set Routes
---------------------------------------------------------------- */
app.use("/api/SALApp", appRoutes);

/* ---------------------------------------------------------------
** Error handling
---------------------------------------------------------------- */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render("./index.html");
});

module.exports = app;
