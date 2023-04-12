const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
app.use(express.static(path.join(__dirname, "public")));
server.listen(8081);

io.on("connection", function (socket) {
  console.log("connection successful" + socket.id);

  socket.on("set-name", function (namer) {
    socket.name = namer;
  });

  socket.on("clientSend-data", function (data) {
    io.emit("serverSend-data", { name: socket.name, message: data });
  });
});
