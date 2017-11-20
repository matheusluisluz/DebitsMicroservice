var mongoose = require("mongoose");
var config = require("../config/index");

var environment = process.env.NODE_ENV;

mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useMongoClient: true });

mongoose.connection.on("connected", () => {
    console.log("Mongoose default connection open to " + "Mongo ATLAS DC");
});

mongoose.connection.on("error", (err) => {
    console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection disconnected");
});

mongoose.connection.on("open", () => {
    console.log("Mongoose default connection is open");
});

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Mongoose default connection disconnected through app termination");
        process.exit(0);
    });
});

module.exports = mongoose;