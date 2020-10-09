const express = require("express");
const router = express.Router();
const model = require("../model");

/* ======================================================== */
router.get("/", (req, res) => {
  res.send("Document Tracking Information System");
});
/* ======================================================== */

/* ======================================================== */
//Users List
router.get("/users", async (req, res) => {
  await model.usersList(res);
});
/* ======================================================== */

/* ======================================================== */
//Users Login
router.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  await model.usersLogin(usernameOrEmail, password, res);
});
/* ======================================================== */

/* ======================================================== */
//Users Logout
router.post("/logout", async (req, res) => {
  const { userId } = req.body;

  await model.usersLogout(userId, res);
});
/* ======================================================== */

/* ======================================================== */
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

//Update User
router.post("/user/update", async (req, res) => {
  const { data } = req.body;

  await model.update_user(data, res);
});

//Update user role
router.post("/user/update/role", async (req, res) => {
  const { role, user_id, sec_id } = req.body;
  await model.update_user_role(role, user_id, sec_id, res);
});

//Update user status
router.post("/user/update/status", async (req, res) => {
  const { status, user_id, sec_id } = req.body;
  await model.update_user_status(status, user_id, sec_id, res);
});

//User transfer office
router.post("/user/transfer/office", async (req, res) => {
  const { sec_id, user_id } = req.body;
  await model.user_transfer_office(sec_id, user_id, res);
});

//User account deletion
router.post("/user/delete", async (req, res) => {
  const { user_id } = req.body;
  await model.deleted_user_accnt(user_id, res);
});
/* ======================================================== */

/* ======================================================== */
//Current System Users
router.get("/user/:userId", async (req, res) => {
  await model.userInfo(req.params.userId, res);
});
/* ======================================================== */

/* ======================================================== */
//Section Users
router.get("/users/section/:sec_id", async (req, res) => {
  console.log(req.params.sec_id);
  await model.section_users(req.params.sec_id, res);
});
/* ======================================================== */

/* ======================================================== */
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
/* ======================================================== */

/* ======================================================== */
// Manage Document Category
// Fetch User Document Category
router.get("/user/document/category/:user_id", async (req, res) => {
  await model.doc_category(req.params.user_id, res);
});

// Add New Document Category
router.post("/user/document/category/new", async (req, res) => {
  const { user_id, category } = req.body;
  model.doc_category_new(user_id, category, res);
});

// Update Document Category
router.post("/user/document/category/update", async (req, res) => {
  const { data, user_id } = req.body;
  model.doc_category_update(data, user_id, res);
});

// Delete Document Category
router.post("/user/document/category/delete", async (req, res) => {
  console.log("andakjfdaksjdf");
  const { doc_category_id } = req.body;

  model.doc_category_delete(doc_category_id, res);
});
/* ======================================================== */

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
router.get("/document/sched/:doc_id", async (req, res) => {
  await model.document_sched_released(req.params.doc_id, res);
});

//Document Action taken
router.get("/document/action/:doc_id", async (req, res) => {
  await model.document_action_taken(req.params.doc_id, res);
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
// Expand Doc Logs
router.get("/document/expand/:doc_id/:status", async (req, res) => {
  await model.document_logs_expand(req.params.doc_id, req.params.status, res);
});
/* ======================================================== */

/* ======================================================== */
//Document Types
router.get("/document/list/types", async (req, res) => {
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
// user Pending document
router.get("/document/pendings/:user_id", async (req, res) => {
  await model.pending_documents(req.params.user_id, res);
});
/* ======================================================== */

/* ======================================================== */
// User document logs
router.get("/document/logs/:user_id", async (req, res) => {
  await model.user_document_logs(req.params.user_id, res);
});
/* ======================================================== */

/* ======================================================== */
// Section Documents
router.get("/document/section/:folder/:user_id", async (req, res) => {
  await model.section_documents(req.params.user_id, req.params.folder, res);
});
/* ======================================================== */

/* ======================================================== */
//Sub Document
router.get("/document/sub/:doc_id", async (req, res) => {
  await model.sub_document(req.params.doc_id, res);
});

//Sub Process
router.get("/document/process/:doc_id", async (req, res) => {
  await model.sub_process(req.params.doc_id, res);
});
/* ======================================================== */

/* ======================================================== */
//Document Dissemination
router.post("/document/dissemination", async (req, res) => {
  const { user_id, doc_id, doc_info, remarks, destination } = req.body;
  await model.document_dissemination(
    user_id,
    doc_id,
    doc_info,
    remarks,
    destination,
    res
  );
});
/* ======================================================== */

/* ======================================================== */
//New Document
router.post("/document/new", async (req, res) => {
  const {
    document_id,
    creator,
    subject,
    doc_type,
    note,
    action_req,
    document_logs,
    category,
  } = req.body;

  await model.new_document(
    document_id,
    creator,
    subject,
    doc_type,
    note,
    action_req,
    document_logs,
    category,
    io,
    res
  );
});
/* ======================================================== */

/* ======================================================== */
//Document Search
router.get("/document/search/:subject", async (req, res) => {
  await model.document_subject_search(req.params.subject, res);
});
/* ======================================================== */

/* ======================================================== */
//Document Tracking
router.get("/document/tracking/:doc_id", async (req, res) => {
  await model.document_tracking(req.params.doc_id, res);
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
  const { department, depshort, payroll } = req.body;
  await model.new_division(department, depshort, payroll, res);
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
//Section List
router.get("/sections", async (req, res) => {
  await model.section_list(res);
});

//Section info
router.get("/section/:sec_id", async (req, res) => {
  await model.section_info(req.params.sec_id, res);
});

//Add new section
router.post("/section/new", async (req, res) => {
  const { division, section, secshort } = req.body;
  await model.new_section(division, section, secshort, res);
});

//Update section
router.post("/section/update", async (req, res) => {
  const { sec_id, div_id, section, secshort } = req.body;
  await model.update_section(sec_id, div_id, section, secshort, res);
});

//Delete section
router.post("/sections/delete", async (req, res) => {
  const { sec_id } = req.body;
  await model.delete_section(sec_id, res);
});
//End Manage NMP Sections
/* ======================================================== */

/* ======================================================== */
//Email Sending
router.post("/send/email", async (req, res) => {
  const { user_id, subject, destination } = req.body;
  await model.email_sending(user_id, subject, destination, res);
});
/* ======================================================== */

module.exports = router;
