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
router.get("/users", (req, res) => {
  model.usersList(res);
});
/* ======================================================== */

/* ======================================================== */
//Users Login
router.post("/login", (req, res) => {
  const { usernameOrEmail, password } = req.body;

  model.usersLogin(usernameOrEmail, password, res);
});
/* ======================================================== */

/* ======================================================== */
//Users Logout
router.post("/logout", (req, res) => {
  const { userId } = req.body;

  model.usersLogout(userId, res);
});
/* ======================================================== */

/* ======================================================== */
//User Registration
router.post("/registration", (req, res) => {
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

  model.userRegistration(
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
router.post("/user/update", (req, res) => {
  const { data } = req.body;

  model.update_user(data, res);
});

//Update user role
router.post("/user/update/role", (req, res) => {
  const { role, user_id, sec_id } = req.body;
  model.update_user_role(role, user_id, sec_id, res);
});

//Update user status
router.post("/user/update/status", (req, res) => {
  const { status, user_id, sec_id } = req.body;
  model.update_user_status(status, user_id, sec_id, res);
});

//User transfer office
router.post("/user/transfer/office", (req, res) => {
  const { sec_id, user_id } = req.body;
  model.user_transfer_office(sec_id, user_id, res);
});

//User account deletion
router.post("/user/delete", (req, res) => {
  const { user_id } = req.body;
  model.deleted_user_accnt(user_id, res);
});
/* ======================================================== */

/* ======================================================== */
//Current System Users
router.get("/user/:userId", (req, res) => {
  model.userInfo(req.params.userId, res);
});
/* ======================================================== */

/* ======================================================== */
//Section Users
router.get("/users/section/:sec_id", (req, res) => {
  console.log(req.params.sec_id);
  model.section_users(req.params.sec_id, res);
});
/* ======================================================== */

/* ======================================================== */
//After Receiving Document
router.post("/document/action", (req, res) => {
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
router.get("/user/document/category/:user_id", (req, res) => {
  model.doc_category(req.params.user_id, res);
});

// Add New Document Category
router.post("/user/document/category/new", (req, res) => {
  const { user_id, category } = req.body;
  model.doc_category_new(user_id, category, res);
});

// Update Document Category
router.post("/user/document/category/update", (req, res) => {
  const { data, user_id } = req.body;
  model.doc_category_update(data, user_id, res);
});

// Delete Document Category
router.post("/user/document/category/delete", (req, res) => {
  console.log("andakjfdaksjdf");
  const { doc_category_id } = req.body;

  model.doc_category_delete(doc_category_id, res);
});
/* ======================================================== */

/* ======================================================== */
//Document Information
router.get("/document/:doc_id", (req, res) => {
  model.document_info(req.params.doc_id, res);
});

//Document Action Required
router.get("/document/required/:doc_id", (req, res) => {
  model.document_action_req(req.params.doc_id, res);
});

//Document Destination
router.get("/document/destination/:doc_id", (req, res) => {
  model.document_destination(req.params.doc_id, res);
});

//Document Date Time Released
router.get("/document/sched/:doc_id", (req, res) => {
  model.document_sched_released(req.params.doc_id, res);
});

//Document Action taken
router.get("/document/action/:doc_id", (req, res) => {
  model.document_action_taken(req.params.doc_id, res);
});

//Document Barcode
router.get("/document/barcode/:doc_id", (req, res) => {
  model.document_barcode(req.params.doc_id, res);
});

//Document Barcodes
router.get("/document/barcodes/:doc_id", (req, res) => {
  model.document_barcodes(req.params.doc_id, res);
});

//Document Route Type
router.get("/document/route/:doc_id", (req, res) => {
  model.document_route_type(req.params.doc_id, res);
});

//Document Current Status
router.get("/document/status/:doc_id", (req, res) => {
  model.document_current_status(req.params.doc_id, res);
});

// Document Route Type (Multiple or Single)
router.get("/document/route/type/:doc_id", (req, res) => {
  model.document_route(req.params.doc_id, res);
});
/* ======================================================== */

/* ======================================================== */
// user Pending document
router.get("/document/pendings/:user_id", (req, res) => {
  model.pending_documents(req.params.user_id, res);
});
/* ======================================================== */

/* ======================================================== */
// User document logs
router.get("/document/logs/:user_id", (req, res) => {
  model.user_document_logs(req.params.user_id, res);
});
/* ======================================================== */

/* ======================================================== */
// Section Documents
router.get("/document/section/:folder/:user_id", (req, res) => {
  model.section_documents(req.params.user_id, req.params.folder, res);
});
/* ======================================================== */

/* ======================================================== */
//Sub Document
router.get("/document/sub/:doc_id", (req, res) => {
  model.sub_document(req.params.doc_id, res);
});

//Sub Process
router.get("/document/process/:doc_id", (req, res) => {
  model.sub_process(req.params.doc_id, res);
});
/* ======================================================== */

/* ======================================================== */
//Document Dissemination
router.post("/document/dissemination", (req, res) => {
  const { user_id, doc_id, doc_info, remarks, destination } = req.body;
  model.document_dissemination(
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
router.post("/document/new", (req, res) => {
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

  model.new_document(
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
router.get("/document/search/:subject", (req, res) => {
  model.document_subject_search(req.params.subject, res);
});
/* ======================================================== */

/* ======================================================== */
//Document Tracking
router.get("/document/tracking/:doc_id", (req, res) => {
  model.document_tracking(req.params.doc_id, res);
});
/* ======================================================== */

/* ======================================================== */
// Manage NMP Divisions
// Divisions list
router.get("/divisions", (req, res) => {
  model.division_list(res);
});

//Division Info
router.get("/division/:divId", (req, res) => {
  model.division_info(req.params.divId, res);
});

//New Division
router.post("/division/new", (req, res) => {
  const { department, depshort, payroll } = req.body;
  model.new_division(department, depshort, payroll, res);
});

//Update Division
router.post("/division/update", (req, res) => {
  const { depid, department, depshort, payrollshort } = req.body;
  model.update_division(depid, department, depshort, payrollshort, res);
});

//Delete Division
router.post("/division/delete", (req, res) => {
  const { div_id } = req.body;
  model.delete_division(div_id, res);
});
//End Manage NMP Divisions
/* ======================================================== */

/* ======================================================== */
//Manage NMP Sections
//Section List
router.get("/sections", (req, res) => {
  model.section_list(res);
});

//Section info
router.get("/section/:sec_id", (req, res) => {
  model.section_info(req.params.sec_id, res);
});

//Add new section
router.post("/section/new", (req, res) => {
  const { division, section, secshort } = req.body;
  model.new_section(division, section, secshort, res);
});

//Update section
router.post("/section/update", (req, res) => {
  const { sec_id, div_id, section, secshort } = req.body;
  model.update_section(sec_id, div_id, section, secshort, res);
});

//Delete section
router.post("/sections/delete", (req, res) => {
  const { sec_id } = req.body;
  model.delete_section(sec_id, res);
});
//End Manage NMP Sections
/* ======================================================== */

/* ======================================================== */
//Email Sending
router.post("/send/email", (req, res) => {
  const { user_id, subject, destination } = req.body;
  model.email_sending(user_id, subject, destination, res);
});
/* ======================================================== */

module.exports = router;
