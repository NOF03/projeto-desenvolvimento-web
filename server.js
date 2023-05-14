const express = require("express");
const app = express();
const cors = require("cors");
//Socket IO setup//
const mongoose = require("mongoose");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const methodOverride = require("method-override");
///////////////////
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const { userModel } = require("./src/models/userModel");
const Room = require("./src/models/roomModel");
require("dotenv/config");
const PORT = process.env.REACT_APP_PORT || 3001;

/**
 * Aqui vamos fazemos referencias de todas as rotas
 */
let userRoute = require("./src/routes/userRoute");
let roomRoute = require("./src/routes/roomRoute");

app.use(express.json()); //Transforma JSON para objecto!
app.use(express.static(__dirname + "/src")); // é uma função middleware no framework Express.js para Node.js que serve arquivos estáticos, como imagens, arquivos CSS e JavaScript.

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
//Express-session middleware
app.use(
  session({
    secret: "your-secret-key", //é usado para encriptar dados da sessão
    resave: false,
    saveUninitialized: false,
  })
);

//////PASSPORT CONFIG//////
app.use(passport.initialize()); //inicializa passport
app.use(passport.session()); //é usado para restaurar uma sessão de utilizador. Isso permitirá que o website mantenha a autenticação do utilizador em todas as solicitações usando dados de sessão.
passport.use(new localStrategy(userModel.authenticate())); //é usado para restaurar uma sessão de utilizador. Isso permitirá que o website mantenha a autenticação do utilizador em todas as solicitações usando dados de sessão
passport.serializeUser(userModel.serializeUser()); //Guarda um utilizador na sessão
passport.deserializeUser(userModel.deserializeUser()); //Retira um utilizador da sessão

//Mongoose connection
mongoose
  .connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

//Middleware que é executado sempre que fazemos, por exemplo, um get/post request.
app.use("/auth", userRoute);
app.use("/room", roomRoute);

server.listen(PORT, () => {
  console.log(`Server running!`);
});

var userSockets;

io.on("connection", async (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.emit("room-list", await Room.find());

  socket.on("get-user", (userID) => {
    const user = userModel.findOne({ _id: userID });
    userSockets[socket.id] = userID;
    socket.emit("user", user);
  });
  socket.on("get room", async (roomID) => {
    try {
      const idRoom = new mongoose.Types.ObjectId(roomID);
      const room = await Room.findOne({ _id: idRoom });

      if (room) {
        // Emit the room details to the client that sent the request
        socket.emit("room details", room);
      } else {
        // Emit an error message to the client that sent the request
        socket.emit("room error", "Room not found");
      }
    } catch (error) {
      console.error(error);
      // Emit an error message to the client that sent the request
      socket.emit("room error", "Failed to get room details");
    }
  });

  socket.on("create room", async (roomName, categ, userID) => {
    try {
      const newRoom = await Room.create({
        name: roomName,
        users: [],
        host: userID,
        category: categ,
      });

      console.log(`Room ${roomName} created`);
      socket.emit("room list", newRoom._id);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("addScoreToUser", async (userID, score, roomID) => {
    console.log(score);
    const idUser = new mongoose.Types.ObjectId(userID);
    const user = await userModel.findOne({ _id: idUser });
    const newTotalScore = user.totalScore + score;
    const newInGameScore = user.inGameScore + score;
    user.totalScore = newTotalScore;
    user.inGameScore = newInGameScore;
    user.inGameCorrectAnswer = true;
    user.correctAnswers += 1;
    const idRoom = new mongoose.Types.ObjectId(roomID);
    const existingRoom = await Room.findOne({ _id: idRoom });
    console.log(existingRoom);
    const userIndex = await existingRoom.users.findIndex(
      (user) => user._id.toString() === userID
    );

    existingRoom.users[userIndex].totalScore += score;
    existingRoom.users[userIndex].inGameScore += score;
    existingRoom.users[userIndex].inGameCorrectAnswer = true;
    existingRoom.users[userIndex].correctAnswers += 1;
    await user.save();
    await existingRoom.save();
  });

  socket.on("noAddScoreToUser", async (userID, roomID) => {
    const idUser = new mongoose.Types.ObjectId(userID);
    const user = await userModel.findOne({ _id: idUser });
    user.inGameCorrectAnswer = false;
    user.incorrectAnswers += 1;
    const idRoom = new mongoose.Types.ObjectId(roomID);
    const existingRoom = await Room.findOne({ _id: idRoom });
    const userIndex = existingRoom.users.findIndex(
      (user) => user._id.toString() === userID
    );

    // If the user exists in the room, update their information
    if (userIndex !== -1) {
      existingRoom.users[userIndex].inGameCorrectAnswer = false;
      existingRoom.users[userIndex].incorrectAnswers += 1;
    }
    await user.save();
    await existingRoom.save();
  });

  socket.on("join room", async (roomID, userID) => {
    try {
      const idRoom = new mongoose.Types.ObjectId(roomID);
      const idUser = new mongoose.Types.ObjectId(userID);
      const existingRoom = await Room.findOne({ _id: idRoom });
      const user = await userModel.findOne({ _id: idUser });
      user.inGameScore = 0;
      await user.save();
      if (existingRoom) {
        existingRoom.users.push(user);
        await existingRoom.save();

        socket.join(roomID);
        console.log(`User ${userID} joined room ${roomID}`);
        io.to(roomID).emit("user joined", userID);
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("leave room", async (roomID, userID) => {
    try {
      const idRoom = new mongoose.Types.ObjectId(roomID);
      const existingRoom = await Room.findOne({ _id: idRoom });

      if (existingRoom) {
        existingRoom.users = existingRoom.users.filter(
          (user) => user.id !== userID
        );
        if (existingRoom.users.length === 0) {
          await Room.deleteOne({ _id: idRoom });
        }

        if (existingRoom && existingRoom.host === userID) {
          existingRoom.host = existingRoom.users[0].id || null;
        }

        await existingRoom.save();

        socket.leave(roomID);
        console.log(`User ${userID} left room ${roomID}`);
        socket.to(roomID).emit("user left", userID);
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("start game", (roomID) => {
    socket.to(roomID).emit("redirect");
  });

  socket.on("disconnect", async () => {
    console.log(`User ${socket.id} disconnected`);

    try {
      const userId = userSockets[socket.id];
      console.log(userSockets);
      const rooms = await Room.find({ users: userId });
      for (const room of rooms) {
        room.users = room.users.filter((newUser) => newUser !== user);

        if (room.host === userId) {
          room.host = room.users[0] || null;
        }

        await room.save();

        socket.leave(room.id);
        console.log(`User ${user.name} left room ${room.roomName}`);
        io.to(room.id).emit("user left", user.name);

        if (room.users.length === 0) {
          await Room.deleteOne({ roomName: room.id });
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
});
