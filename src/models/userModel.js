let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gamesPlayed: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  accountCreatedDate: { type: Date, default: new Date() },
  correctAnswers: { type: Number, default: 0 },
  incorrectAnswers: { type: Number, default: 0 },
});

let UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
