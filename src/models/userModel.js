const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  gamesPlayed: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  accountCreatedDate: { type: Date, default: new Date() },
  correctAnswers: { type: Number, default: 0 },
  incorrectAnswers: { type: Number, default: 0 },
});

userSchema.plugin(passportLocalMongoose); //Vai adicionar username e password

module.exports = mongoose.model("User", userSchema);
 