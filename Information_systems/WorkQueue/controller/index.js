const http = require("http");
const express = require("express");
const router = express.Router();
const api = express();
const socketIO = require("socket.io");
const http_server = http.createServer(api);
const io = socketIO(http_server);
const model = require("../model");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:/Users/actocayon/Desktop/react_projects/uploaded_file");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).any();

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

/* ======================================================== */

/* ======================================================== */
//User Login
router.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  await model.user_login(usernameOrEmail, password, io, res);
});
/* ======================================================== */

/* ======================================================== */
//User Logout
router.post("/logout", async (req, res) => {
  const { user_id } = req.body;
  await model.user_logout(user_id, io, res);
});

/* ======================================================== */

/* ======================================================== */
// Add New Job Request
router.post("/new/job-request", async (req, res) => {
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

/* ======================================================== */
router.get("/client/job-requests/:user_id", async (req, res) => {
  await model.client_job_request(req.params.user_id, res);
});
/* ======================================================== */

/* ======================================================== */
router.post("/web_upload", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    model.web_upload(
      req.body.requisitioner,
      req.body.file_name,

      req.files,
      req.body.destination.split(","),
      res
    );
  });
});
/* ======================================================== */

/* ======================================================== */
// Web uplaod list
router.get("/web_upload_list/:user_id", (req, res) => {
  model.web_upload_lists(req.params.user_id, res);
});

// Web uplaod destination
router.get("/web_upload_destination/:web_upload_id", (req, res) => {
  model.web_upload_destination(req.params.web_upload_id, res);
});

// Web upload file
router.get("/web_upload_file/:web_upload_id", (req, res) => {
  model.web_upload_file(req.params.web_upload_id, res);
});

// Web upload logs
router.get("/web_upload_logs/:web_upload_id", (req, res) => {
  model.web_upload_logs(req.params.web_upload_id, res);
});
/* ======================================================== */

/* ======================================================== */
// Section List
router.get("/sections", async (req, res) => {
  await model.sectionList(res);
});
/* ======================================================== */

module.exports = router;
