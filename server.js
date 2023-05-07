const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

let userRoute = require("./src/routes/userRoute");

app.use(express.json()); //Transforma JSON para objecto!
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://nof:AcgI3ykTIK37DVO7@fragmer.vgvqf8v.mongodb.net/fragmer?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.use("/auth", userRoute);

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
