const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String
});

module.exports = mongoose.model("Place", placeSchema);