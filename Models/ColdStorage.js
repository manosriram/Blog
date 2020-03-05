const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColdStore = new Schema({
    title: {
        type: String
    },
    url: {
        type: String
    },
    addedOn: {
        type: Date,
        default: Date.now()
    }
});

module.exports = ColdStorage = mongoose.model("ColdStorage", ColdStore);

