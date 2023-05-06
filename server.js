const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://nof:AcgI3ykTIK37DVO7@fragmer.vgvqf8v.mongodb.net/fragmer?retryWrites=true&w=majority"
);

app.listen(3001, () => {
    console.log("SERVER RUNS PERFECTLY!");
})