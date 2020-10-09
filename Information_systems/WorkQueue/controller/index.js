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

// Update user info
router.post("/user/update", async (req, res) => {
  const { data } = req.body;

  await model.update_user_info(data, res);
});

/* ======================================================== */

/* ======================================================== */
// Users Change Password

// Code generation
router.post("/users/code/generate", (req, res) => {
  const { user_id, email } = req.body;

  model.users_changePass_codeGenerate(user_id, email, res);
});

// Validate code
router.post("/users/code/validate", (req, res) => {
  const { users_id, code } = req.body;
  console.log("validation nadara");
  model.validateCode(users_id, code, res);
});

// Change password
router.post("/users/change/password", (req, res) => {
  const { user_id, new_password } = req.body;
  model.users_changePassword(user_id, new_password, res);
});
/* ======================================================== */

/* ======================================================== */
//User Login
router.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  await model.user_login(usernameOrEmail, password, res);
});
/* ======================================================== */

/* ======================================================== */
//User Logout
router.post("/logout", async (req, res) => {
  const { user_id } = req.body;
  await model.user_logout(user_id, res);
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
// Client Job request
router.get("/client/job-requests/:user_id", async (req, res) => {
  await model.client_job_request(req.params.user_id, res);
});
/* ======================================================== */

/* ======================================================== */
// Admin side

// List of job requests
router.get("/admin/job/requests/:user_id", async (req, res) => {
  await model.job_requests(req.params.user_id, res);
});

// List of accepted job request
router.get("/admin/job/list/:user_id", async (req, res) => {
  await model.admin_job_list(req.params.user_id, res);
});

// List of job request report
router.get("/admin/job/request/reports/:user_id", async (req, res) => {
  await model.admin_job_request_reports(req.params.user_id, res);
});

// Admin Web Upload list
router.get("/admin/web/uploads", async (req, res) => {
  await model.admin_web_upload_list(res);
});

// Admin Web upload requests
router.get("/admin/web/upload/requests", async (req, res) => {
  await model.admin_web_upload_request(res);
});
/* ======================================================== */

/* ======================================================== */
// Respone/Update Status Job Request
router.post("/admin/job/request/action", async (req, res) => {
  const { inspector_id, task_id, status, remarks } = req.body;
  await model.job_request_action(inspector_id, task_id, status, remarks, res);
});
/* ======================================================== */

/* ======================================================== */
// Job request logs
router.get("/job/request/logs/:task_id", async (req, res) => {
  await model.job_request_logs(req.params.task_id, res);
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
