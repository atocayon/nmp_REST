const http = require("http");
const express = require("express");
const router = express.Router();
const api = express();
const socketIO = require("socket.io");
const http_server = http.createServer(api);
const io = socketIO(http_server);
const model = require("../model");
router.get("/", (req, res) => {
  res.send("Document Tracking Information_systems");
});

//Users Login
router.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  await model.usersLogin(usernameOrEmail, password, io, res);
});

//Users Logout
router.post("/logout", async (req, res) => {
  const { userId } = req.body;

  await model.usersLogout(userId, io, res);
});

module.exports = router;
