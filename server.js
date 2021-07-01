//jshint esversion:6
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
//const https=require("https");

app.use(express.static(__dirname + "/public"));

const http = require("http").createServer(app);
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/create-user", function (req, res) {
  let name = req.body.use;
  res.render(__dirname + "/public/chat.ejs", { userName: name });
});
/*
app.listen(3000,function(){
  console.log("server is running on port 3000");
});
*/

//socket
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("Connected...");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
    //console.log('msg')
  });
});
