// dependenices
const mongoose = require("mongoose");
const { stringify } = require("querystring");
const userSchema = new mongoose mongoose.Schema({
      email: { type: stringify, rquired; true },
      password: { type: stringify, required: true, minlengh: 5 },
      displayName: { type: String },
});

module.exports = User = mongoose.model("user", userSchema);

