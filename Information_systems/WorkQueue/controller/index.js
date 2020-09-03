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

// Get user info
router.get("/user/:user_id", async (req, res) => {
  await model.userInfo(req.params.user_id, res);
});

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

// Section List
router.get("/sections", async (req, res) => {
  await model.sectionList(res);
});

// Add New Job Request
router.post("/job-request", async (req, res) => {
  const {
    requisitioner_id,
    task_secid,
    dateNeeded,
    typeOfWork,
    otherTypeOfWork,
    scopeOfWork,
  } = req.body;

  await model.new_job_request(
    requisitioner_id,
    task_secid,
    dateNeeded,
    typeOfWork,
    otherTypeOfWork,
    scopeOfWork,
    res
  );
});
/* ======================================================== */

module.exports = router;
