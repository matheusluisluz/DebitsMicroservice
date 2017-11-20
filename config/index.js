var env = process.env.NODE_ENV || "test";
var config = require(`./${env}`);

module.exports = config;