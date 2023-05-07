let mongoose = require("mongoose");

let RoomSchema = new mongoose.Schema({
  usersID: [ObjectId],
  category: Number,
});

let RoomModel = mongoose.model("rooms", RoomSchema);

module.exports = RoomModel;
