const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit("message", data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});