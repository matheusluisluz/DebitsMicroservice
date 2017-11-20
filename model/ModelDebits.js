var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Task = {
    debits: Schema({
        cardId: String,
        code: String,
        value: Number,
        debitedAt: Date
    })
}

module.exports = (db) => db.model("Debits", Task.debits);