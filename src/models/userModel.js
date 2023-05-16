const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  gamesPlayed: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  accountCreatedDate: { type: Date, default: new Date() },
  correctAnswers: { type: Number, default: 0 },
  incorrectAnswers: { type: Number, default: 0 },
  inGameCorrectAnswer:{ type: Boolean, default: false},
  inGameScore : { type: Number, default: 0},
  avatar : { type: String, default: "https://robohash.org/cbf891dd6214aa905f48c352967eda1e?set=set4&bgset=&size=400x400"}
});

userSchema.plugin(passportLocalMongoose); //Vai adicionar username e password
const userModel = mongoose.model("User", userSchema)
module.exports = {userSchema, userModel };