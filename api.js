const http = require("http");

const express = require("express");
const api = express();
const socketIO = require("socket.io");
const http_server = http.createServer(api);
const io = socketIO(http_server);

const bodyParser = require("body-parser");
require("dotenv/config");

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

//Token Verification
const tokenVerification = require("./Information_systems/common/Token/verification");

//Import Routes for Document Tracking Information_systems
const dts = require("./Information_systems/DocumentTracking/controller");

//List of active Users
const userList = require("./Information_systems/common/ListOfActiveUsers/users");

//User Verification
api.use("/", tokenVerification); // DTS

//Routes Document Tracking Information_systems
api.use("/dts", dts);

//Route Work Queue Information Information_systems
// api.use("/work-queue");

//Socket.io connections
io.on("connection", (socket) => {
  socket.on("active_users", () => {
    userList(io);
  });

  socket.on("disconnect", () => {
    console.log("socket connection close...");
    socket.disconnect();
  });
});

api.listen(process.env.PORT);
