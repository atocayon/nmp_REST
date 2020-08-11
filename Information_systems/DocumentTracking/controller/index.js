const http = require("http");
const express = require("express");
const router = express.Router();
const api = express();
const socketIO = require("socket.io");
const http_server = http.createServer(api);
const io = socketIO(http_server);
const model = require("../model");
router.get("/", (req, res) => {
  res.send("Document Tracking Information System");
});

//Users List
router.get("/users", async (req, res) => {
  await model.usersList(res);
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

//User Registration
router.post("/registration", async (req, res) => {
  const {
    role,
    employeeId,
    name,
    username,
    password,
    contact,
    email,
    section,
    position,
  } = req.body;

  await model.userRegistration(
    role,
    employeeId,
    name,
    username,
    password,
    contact,
    email,
    section,
    position,
    res
  );
});

//Current System Users
router.get("/user/:userId", async (req, res) => {
  await model.userInfo(req.params.userId, res);
});

//After Receiving Document
router.post("/document/action", async (req, res) => {
  const {
    documentId,
    user_id,
    remarks,
    destinationType,
    destination,
    status,
  } = req.body;

  model.document_action(
    documentId,
    user_id,
    remarks,
    destinationType,
    destination,
    status,
    res
  );
});

//Document Category
router.get("/category/:user_id", async (req, res) => {
  await model.doc_category(req.params.user_id, res);
});

//Document Information
router.get("/document/:doc_id", async (req, res) => {
  await model.document_info(req.params.doc_id, res);
});

//Document Action Required
router.get("/document/required/:doc_id", async (req, res) => {
  await model.document_action_req(req.params.doc_id, res);
});

//Document Destination
router.get("/document/destination/:doc_id", async (req, res) => {
  await model.document_destination(req.params.doc_id, res);
});


// Manage NMP Divisions
// Divisions list
router.get("/divisions", async (req, res) => {
  await model.division_list(res);
});

//Division Info
router.get("/division/:divId", async (req, res) => {
  await model.division_info(req.params.divId, res);
});

//New Division
router.post("/division/new", async (req, res) => {
  const { department, depshort, payrollshort } = req.body;
  await model.new_division(department, depshort, payrollshort, res);
});

//Update Division
router.post("/division/update", async (req, res) => {
  const { depid, department, depshort, payrollshort } = req.body;
  await model.update_division(depid, department, depshort, payrollshort, res);
});

//Delete Division
router.post("/division/delete", async (req, res) => {
  const { div_id } = req.body;
  await model.delete_division(div_id, res);
});
//End Manage NMP Divisions

module.exports = router;
