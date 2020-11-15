const express = require("express");
const http = require("http");
const api = express();
const router = express.Router();

const http_server = http.createServer(api);
global.io = require("socket.io")(http_server, { origins: "*:*" });
// const io = socketIO(http_server);
const PORT = process.env.PORT || 4000;

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv/config");
api.use(cors());

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

//Token Verification
const tokenVerification = require("./Information_systems/common/Token/verification");

//Import Routes for Document Tracking Information_systems
const dts = require("./Information_systems/DocumentTracking/controller");

//Import Routes for Work Queue Information System
const work_queue = require("./Information_systems/WorkQueue/controller");

//Socket.io callbacks for Document Tracking System
const document_trackingNumber = require("./Information_systems/DocumentTracking/model/document_trackingNumber");
const total_pending_doc = require("./Information_systems/DocumentTracking/model/total_pending_documents");
const documents = require("./Information_systems/common/DocumentLogs");
const work = require("./Information_systems/common/WorkLogs");
const receive_document = require("./Information_systems/DocumentTracking/model/receive_document");

const user_login = require("./Information_systems/common/User_Management/usersLogin");
const user_logout = require("./Information_systems/common/User_Management/usersLogout");

const division = require("./Information_systems/common/ManageDivisions/division_info");
const division_update = require("./Information_systems/common/ManageDivisions/update_division");
const delete_division = require("./Information_systems/common/ManageDivisions/delete_division");
const add_division = require("./Information_systems/common/ManageDivisions/new_division");

const section = require("./Information_systems/common/ManageSections/section_info");
const section_update = require("./Information_systems/common/ManageSections/update_section");
const delete_section = require("./Information_systems/common/ManageSections/delete_section");
const add_section = require("./Information_systems/common/ManageSections/new_section");

const user = require("./Information_systems/common/Get_UserInfo");
const userRegistration = require("./Information_systems/common/UserRegistration");
const user_update = require("./Information_systems/common/User_Management/update_user");
const deleteUser = require("./Information_systems/common/User_Management/delete_user_accnt");

const fetch_sections = require("./Information_systems/common/ManageSections/section_list");
const fetch_divisions = require("./Information_systems/common/ManageDivisions/divisions_list");
const fetch_users = require("./Information_systems/common/ListOfUsers");
const fetch_active_users = require("./Information_systems/common/ListOfActiveUsers/users");
const fetch_document_types = require("./Information_systems/common/ManageDocumentTypes/document_types");

const changePassword = require("./Information_systems/common/ChangePassword");

const document_type = require("./Information_systems/common/ManageDocumentTypes/document_type_info");
const add_documentType = require("./Information_systems/common/ManageDocumentTypes/new_document_type");
const document_type_update = require("./Information_systems/common/ManageDocumentTypes/update_document_type");
const delete_document_type = require("./Information_systems/common/ManageDocumentTypes/delete_document_type");

const doc_logs = require("./Information_systems/common/DocumentLogs/logs");

//User Verification
api.use("/", tokenVerification); // DTS

//Routes Document Tracking Information_systems
api.use("/dts", dts);

//Route Work Queue Information Information_systems
api.use("/work-queue", work_queue);

// Common endpoint
api.post("/login", (req, res) => {
  const { usernameOrEmail, password } = req.body;

  user_login(usernameOrEmail, password, res);
});

api.post("/logout", (req, res) => {
  const { user_id } = req.body;
  user_logout(user_id, res);
});

api.get("/fetchUsers", (req, res) => {
  fetch_users(res);
});

api.get("/user/:user_id", (req, res) => {
  user(req.params.user_id, res);
});

api.post("/user/update", (req, res) => {
  const { data } = req.body;
  // console.log(data);
  user_update(data, res);
});

api.get("/fetchSections", (req, res) => {
  fetch_sections(res);
});

api.get("/fetchDivisions", (req, res) => {
  fetch_divisions(res);
});

api.post("/changePassword", (req, res) => {
  const { user_id, password } = req.body;
  changePassword(user_id, password, res);
});

api.post("/deleteUser", (req, res) => {
  const { user_id } = req.body;
  deleteUser(user_id, res);
});

api.post("/userRegistration", (req, res) => {
  const {
    employeeId,
    name,
    username,
    password,
    contact,
    email,
    section,
    position,
    dts_role,
    work_queue_role,
    control_panel,
  } = req.body;
  userRegistration(
    employeeId,
    name,
    username,
    password,
    contact,
    email,
    section,
    position,
    dts_role,
    work_queue_role,
    control_panel,
    res
  );
});

api.get("/division/:divid", (req, res) => {
  division(req.params.divid, res);
});

api.post("/division/update", (req, res) => {
  const { depid, department, depshort } = req.body;
  division_update(depid, department, depshort, res);
});

api.post("/division/delete", (req, res) => {
  const { depid } = req.body;
  delete_division(depid, res);
});

api.post("/division/add/new", (req, res) => {
  const { department, depshort } = req.body;
  add_division(department, depshort, res);
});

api.get("/section/:secid", (req, res) => {
  section(req.params.secid, res);
});

api.post("/section/update", (req, res) => {
  const { secid, divid, section, secshort } = req.body;
  section_update(secid, divid, section, secshort, res);
});

api.post("/section/delete", (req, res) => {
  const { secid } = req.body;
  delete_section(secid, res);
});

api.post("/section/add/new", (req, res) => {
  const { divid, section, secshort } = req.body;
  add_section(divid, section, secshort, res);
});

api.get("/document_types", (req, res) => {
  fetch_document_types(res);
});

api.get("/document_type/:doc_type_id", (req, res) => {
  document_type(req.params.doc_type_id, res);
});

api.post("/document_type/update", (req, res) => {
  const { id, type } = req.body;
  document_type_update(id, type, res);
});

api.post("/document_type/delete", (req, res) => {
  const { id } = req.body;
  delete_document_type(id, res);
});

api.post("/document_type/add/new", (req, res) => {
  const { type } = req.body;
  add_documentType(type, res);
});

api.get("/document/logs/:doc_id", (req, res) => {
  doc_logs(req.params.doc_id, res);
});

//Socket.io connections
io.on("connection", (socket) => {
  socket.on("active_users", () => {
    fetch_active_users(io);
  });

  socket.on("document_trackingNumber", () => {
    document_trackingNumber(io);
  });

  socket.on("total_pending_doc", (user_id) => {
    total_pending_doc(user_id, socket);
  });

  socket.on("document_logs", () => {
    documents();
  });

  socket.on("work_queue_logs", () => {
    work();
  });

  socket.on(
    "receive_document",
    (documentTracking, user_id, user_section, callback) => {
      receive_document(
        documentTracking,
        user_id,
        user_section,
        callback,
        socket
      );
    }
  );

  socket.on("disconnect", () => {
    console.log("socket connection close...");
    socket.disconnect();
  });
});

http_server.listen(PORT, () => {
  console.log("SERVER IS RUNNING ON PORT: " + PORT);
});
