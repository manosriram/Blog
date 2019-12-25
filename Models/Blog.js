const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSc = new Schema({
    title: String,
    content: String,
    createdBy: String,
    category: String,
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Blog = mongoose.model("Blog", BlogSc);

