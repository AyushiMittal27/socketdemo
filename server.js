const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
let usersockets = {};
app.use("/", express.static(path.join(__dirname, "frontend")));
io.on("connection", (socket) => {
  console.log(" New socket formed from " + socket.id);
  socket.emit("connected");

  socket.on("login", (data) => {
    // username is data.user
    usersockets[data.user] = socket.id;
    console.log(usersockets);
  });
  socket.on("send_msg", (data) => {
    /* if we use io.emit everyone gets it
        // if we use socket.broadcast.emit only others willl get it
         //io.emit('recv_msg' , data)

        */
    /// console.log("Received message ="+ data.message)
    if (data.message.startsWith("@")) {
      let receipient = data.message.split(":")[0].substr(1);
      let recptSocket = usersockets[receipient];
      io.to(recptSocket).emit("recv_msg", data);
    } else {
      socket.broadcast.emit("recv_msg", data);
    }
  });
});

server.listen(5400, () =>
  console.log("This  Website opens on http://localhost:5400")
);
