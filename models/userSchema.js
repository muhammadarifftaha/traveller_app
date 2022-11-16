const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  uuid: { type: String, required: true },
});

//to avoid duplicate name:1 will create username, name:0 will not create username

userSchema.index({ username: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
