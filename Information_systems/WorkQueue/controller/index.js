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
router.get("/", (req, res) => {
  res.status(200).send("Work Queue Information System");
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

/* ======================================================== */

/* ======================================================== */
// Add New Job Request
router.post("/new/job-request", (req, res) => {
  const {
    requisitioner_id,
    task_secid,
    dateNeeded,
    typeOfWork,
    otherTypeOfWork,
    scopeOfWork,
  } = req.body;

  model.new_job_request(
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
router.get("/client/job-requests/:user_id", (req, res) => {
  model.client_job_request(req.params.user_id, res);
});
/* ======================================================== */

/* ======================================================== */
// Admin side

// List of job requests
router.get("/admin/job/requests/:user_id", (req, res) => {
  model.job_requests(req.params.user_id, res);
});

// List of accepted job request
router.get("/admin/job/list/:user_id", (req, res) => {
  model.admin_job_list(req.params.user_id, res);
});

// List of job request report
router.get("/admin/job/request/reports/:user_id", (req, res) => {
  model.admin_job_request_reports(req.params.user_id, res);
});

// Admin Web Upload list
router.get("/admin/web/uploads/:validator", (req, res) => {
  model.admin_web_upload_list(req.params.validator, res);
});

// Admin Web upload requests
router.get("/admin/web/upload/requests", (req, res) => {
  model.admin_web_upload_request(res);
});

// Graph Presentation of Job Request reports

// Fetch Total task renderd per office
router.get("/admin/office/total/task/:inspector", (req, res) => {
  model.fetch_total_task_rendered_office(req.params.inspector, res);
});

// Fetch task year
router.get("/admin/task/year/:inspector", (req, res) => {
  model.fetch_task_year(req.params.inspector, res);
});

// Fetch task month in task year
router.get("/admin/task/month/:year", (req, res) => {
  model.fetch_month_in_task_year(req.params.year, res);
});

// Fetch task per month in task year
router.get("/admin/task/month/total/:month", (req, res) => {
  model.fetch_tasks_per_month_in_task_year(req.params.month, res);
});

/* ======================================================== */

/* ======================================================== */
// Respone/Update Status Job Request
router.post("/admin/job/request/action", (req, res) => {
  const { inspector_id, task_id, status, remarks } = req.body;
  model.job_request_action(inspector_id, task_id, status, remarks, res);
});

// client job confirmation
router.post("/admin/job/request/confirmation", (req, res) => {
  const { task_id, status, remarks } = req.body;
  model.job_request_confirmation(task_id, status, remarks, res);
});
/* ======================================================== */

/* ======================================================== */
// Reponse/Update Status Web upload request
router.post("/admin/web/upload/request/update", (req, res) => {
  const { validator, web_upload_id, status } = req.body;
  model.web_upload_request_action(validator, web_upload_id, status, res);
});
/* ======================================================== */

/* ======================================================== */
// Job request logs
router.get("/job/request/logs/:task_id", (req, res) => {
  model.job_request_logs(req.params.task_id, res);
});
/* ======================================================== */

/* ======================================================== */
// Web Upload
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
router.get("/sections", (req, res) => {
  model.sectionList(res);
});
/* ======================================================== */

module.exports = router;
