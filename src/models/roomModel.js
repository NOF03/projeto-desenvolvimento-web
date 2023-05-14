const mongoose = require("mongoose");
let {userSchema} = require("../models/userModel");

let RoomSchema = new mongoose.Schema({
  name: String,
  users: [userSchema],
  host: String,
  category: Number
});

let RoomModel = mongoose.model("rooms", RoomSchema);

module.exports = RoomModel;
