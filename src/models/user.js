const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema( {
    username: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gamesPlayed: Number,
    totalScore: Number,
    accountCreatedDate: Date,
    correctAnswers: Number,
    incorrectAnswers: Number,
});

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel;
