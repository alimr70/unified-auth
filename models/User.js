const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String },
  image: { type: String, defaul: null },
  registerMethod: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("User", UserSchema);
