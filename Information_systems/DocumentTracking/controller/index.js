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

/* ======================================================== */
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

//Document Date Time Released
router.get("/document/sched/:doc_id/:receiver_id", async (req, res) => {
  await model.document_sched_released(
    req.params.receiver_id,
    req.params.doc_id,
    res
  );
});

//Document Action taken
router.get("/document/action/:doc_id/:receiver_id", async (req, res) => {
  await model.document_action_taken(
    req.params.receiver_id,
    req.params.doc_id,
    res
  );
});

//Document Barcode
router.get("/document/barcode/:doc_id", async (req, res) => {
  await model.document_barcode(req.params.doc_id, res);
});

//Document Barcodes
router.get("/document/barcodes/:doc_id", async (req, res) => {
  await model.document_barcodes(req.params.doc_id, res);
});

//Document Route Type
router.get("/document/route/:doc_id", async (req, res) => {
  await model.document_route_type(req.params.doc_id, res);
});

//Document Current Status
router.get("/document/status/:doc_id", async (req, res) => {
  await model.document_current_status(req.params.doc_id, res);
});
/* ======================================================== */

/* ======================================================== */
//Document Types
router.get("/document/types", async (req, res) => {
  await model.document_types(res);
});

//Document Type info
router.get("/document/type/:doc_type_id", async (req, res) => {
  await model.document_type_info(req.params.doc_type_id, res);
});

// New Document Type
router.post("/document/type/new", async (req, res) => {
  const { doc_type } = req.body;
  await model.new_document_type(doc_type, res);
});

//Update Document Type
router.post("/document/type/update", async (req, res) => {
  const { doc_type_id, doc_type } = req.body;

  await model.update_document_type(doc_type_id, doc_type, res);
});

//Delete Document Type
router.post("/document/type/delete", async (req, res) => {
  const { doc_type_id } = req.body;

  await model.delete_document_type(doc_type_id, res);
});
/* ======================================================== */

/* ======================================================== */
router.get("/document/pendings", async (req, res) => {
  const { user_id } = req.body;

  await model.pending_documents(user_id, res);
});
/* ======================================================== */

/* ======================================================== */
router.get("/document/logs/:user_id", async (req, res) => {
  await model.user_document_logs(req.params.user_id, res);
});
/* ======================================================== */

/* ======================================================== */
router.get("/document/section/:user_id", async (req, res) => {
  await model.section_documents(req.params.user_id, res);
});
/* ======================================================== */

/* ======================================================== */
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
/* ======================================================== */

/* ======================================================== */
//Manage NMP Sections
router.get("/sections", async (req, res) => {
  await model.section_list(res);
});

//End Manage NMP Sections
/* ======================================================== */

module.exports = router;
