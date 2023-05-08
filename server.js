const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 3001;
/**
 * Aqui vamos fazemos referencias de todas as rotas
 */
let userRoute = require("./src/routes/userRoute");

app.use(express.json()); //Transforma JSON para objecto!
app.use(cors({
  origin : 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());

//Mongoose connection
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

//Middleware que é executado sempre que fazemos, por exemplo, um get/post request.
app.use("/auth", userRoute);

app.listen(PORT, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
