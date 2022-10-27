//App framework
const express = require("express");
const app = express();
const http = require("http");
//Create server app
const server = http.createServer(app);
//Import socket
const { Server } = require("socket.io");
//Create socket object for the server
const io = new Server(server);
//Set server port
const port = process.env.PORT || 3000;
//Show index.html as initial route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//Listen the socket connections
io.on("connection", (socket) => {
  //Listen the socket disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  //Listen to the custom event from client
  socket.on("send_to", (msg) => {
    console.log("msg", msg);
    //On event respond with the data
    //Server is emitting the data to client
    io.emit("receive_from", msg); //Send to everyone including me
    // socket.broadcast.emit("receive_from", msg); //Send to everyone other than emitting socket
  });
});
//Start server at port set above
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
