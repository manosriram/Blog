const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Counter = new Schema({
    code: {
        type: String,
        default: "GBL"
    },
    ctr: []
});

module.exports = CTR = mongoose.model("counter", Counter);


