const mongoose = require("mongoose");

let RoomSchema = new mongoose.Schema({
  name: String,
  usersID: [String],
  host: String,
  category: Number
});

let RoomModel = mongoose.model("rooms", RoomSchema);

module.exports = RoomModel;
