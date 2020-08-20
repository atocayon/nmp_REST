const http = require("http");
const express = require("express");
const router = express.Router();
const api = express();
const socketIO = require("socket.io");
const http_server = http.createServer(api);
const io = socketIO(http_server);
const model = require("../model");

/* ======================================================== */
router.get("/", async (req, res) => {
  res.status(200).send("Work Queue Information System");
});
/* ======================================================== */

/* ======================================================== */
//User Login
router.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  await model.user_login(usernameOrEmail, password, io, res);
});

//User Logout
router.post("/logout", async (req, res) => {
  const { user_id } = req.body;
  await model.user_logout(user_id, io, res);
});
/* ======================================================== */

module.exports = router;
