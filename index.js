const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`ID CONNECTED ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);

    console.log(`${socket.id} joined card ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.card_id).emit("receive_message", data);

    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log(`ID DISCONNECT ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("Websocket running 😎");
});
