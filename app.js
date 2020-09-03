
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require("./routes/api/routes")();
var indexRouter = require("./routes/index/routes")();

var app = express();

var port = process.env.PORT || 3300;

app.listen(port, () => {
    console.log("La aplicacion esta corriendo correctamente.");
});

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", indexRouter);

app.use("/api", apiRouter);