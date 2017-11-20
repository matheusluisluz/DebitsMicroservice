const express = require("express");
const bodyParser = require("body-parser");
const consign = require("consign");
const cors = require("cors");
const expressValidator = require("express-validator");
const morgan = require("morgan");
const logger = require("../services/logger");

var app = express();

app.use(morgan("common", {
    stream: {
        write: function (mensagem) {
            logger.info(mensagem);
        }
    }
}));

app.use((req, resp, next) => {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    resp.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

consign()
    .include("persistence")
    .then("controllers")
    .into(app);

module.exports = app;