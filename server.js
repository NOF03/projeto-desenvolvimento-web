const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
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
const user = require("./src/models/userModel");
const Room = require("./src/models/roomModel");
require("dotenv/config");
const PORT = process.env.REACT_APP_PORT || 3001;

/**
 * Aqui vamos fazemos referencias de todas as rotas
 */
let userRoute = require("./src/routes/userRoute");
let roomRoute = require("./src/routes/roomRoute");

app.use(express.json()); //Transforma JSON para objecto!
app.use(cookieParser());
app.use(express.static(__dirname + "/src")); // é uma função middleware no framework Express.js para Node.js que serve arquivos estáticos, como imagens, arquivos CSS e JavaScript.

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
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
passport.use(new localStrategy(user.authenticate())); //é usado para restaurar uma sessão de utilizador. Isso permitirá que o website mantenha a autenticação do utilizador em todas as solicitações usando dados de sessão
passport.serializeUser(user.serializeUser()); //Guarda um utilizador na sessão
passport.deserializeUser(user.deserializeUser()); //Retira um utilizador da sessão

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

io.on("connection", async (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.emit("room-list", await Room.find());

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
        usersID: [],
        host: userID,
        category: categ,
      });

      console.log(`Room ${roomName} created`);
      socket.emit("room list", newRoom._id);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("join room", async (roomID, userID) => {
    try {
      const idRoom = new mongoose.Types.ObjectId(roomID);
      const existingRoom = await Room.findOne({ _id: idRoom });

      if (existingRoom) {
        existingRoom.usersID.push(userID);
        await existingRoom.save();
        socket.join(roomID);
        console.log(`User ${userID} joined room ${roomID}`);
        io.to(roomID).emit("user joined", userID);
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("leave room", async (roomName) => {
    try {
      const existingRoom = await Room.findOne({ roomName });

      if (existingRoom) {
        existingRoom.users = existingRoom.users.filter(
          (user) => user !== socket.id
        );

        if (existingRoom.host === socket.id) {
          existingRoom.host = existingRoom.users[0] || null;
        }

        await existingRoom.save();

        socket.leave(roomName);
        console.log(`User ${socket.id} left room ${roomName}`);
        io.to(roomName).emit("user left", socket.id);

        if (existingRoom.users.length === 0) {
          await Room.deleteOne({ roomName });
          io.emit("room list", await Room.find());
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", async () => {
    console.log(`User ${socket.id} disconnected`);

    try {
      const rooms = await Room.find({ users: socket.id });

      for (const room of rooms) {
        room.users = room.users.filter((user) => user !== socket.id);

        if (room.host === socket.id) {
          room.host = room.users[0] || null;
        }

        await room.save();

        socket.leave(room.roomName);
        console.log(`User ${socket.id} left room ${room.roomName}`);
        io.to(room.roomName).emit("user left", socket.id);

        if (room.users.length === 0) {
          await Room.deleteOne({ roomName: room.roomName });
          io.emit("room list", await Room.find()); // Update room list for all clients
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
});
