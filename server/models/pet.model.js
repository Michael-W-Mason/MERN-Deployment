const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minlength: [3, "length must be at least 3 characters"],
    },
    type: {
        type: String,
        required: [true, "type is required"],
        minlength: [3, "length must be at least 3 characters"]
    },
    description: {
        type: String,
        required: [true, "description is required"],
        minlength: [3, "length must be at least 3 characters"]
    },
    skill1: {
        type: String,
    },
    skill2: {
        type: String,
    },
    skill3: {
        type: String,
    }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;