const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [3, "{PATH} must be more than {MINLENGTH} characters"]
        }
    },
    { timestamps: true }
);

const Author = mongoose.model("author", AuthorSchema);

module.exports = Author;