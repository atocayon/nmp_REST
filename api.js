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
const userList = require("./Information_systems/common/ListOfActiveUsers/users");
const document_trackingNumber = require("./Information_systems/DocumentTracking/model/document_trackingNumber");
const total_pending_doc = require("./Information_systems/DocumentTracking/model/total_pending_documents");
const document_logs = require("./Information_systems/DocumentTracking/model/document_logs");
const receive_document = require("./Information_systems/DocumentTracking/model/receive_document");

const user_login = require("./Information_systems/common/User_Management/usersLogin");
const user_logout = require("./Information_systems/common/User_Management/usersLogout");
const allUser = require("./Information_systems/common/ListOfUsers");
const user = require("./Information_systems/common/Get_UserInfo");
const user_update = require("./Information_systems/common/User_Management/update_user");

const fetch_sections = require("./Information_systems/common/ManageSections/section_list");
const fetch_divisions = require("./Information_systems/common/ManageDivisions/divisions_list");
const changePassword = require("./Information_systems/common/ChangePassword");
const deleteUser = require("./Information_systems/common/User_Management/delete_user_accnt");
const userRegistration = require("./Information_systems/common/UserRegistration");
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

api.get("/fetchUsers", (req, res) => {
  allUser(res);
});

api.get("/user/:user_id", (req, res) => {
  user(req.params.user_id, res);
});

api.post("/user/update", (req, res) => {
  const { data } = req.body;
  console.log(data);
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
//Socket.io connections
io.on("connection", (socket) => {
  socket.on("active_users", () => {
    userList(io);
  });

  socket.on("document_trackingNumber", () => {
    document_trackingNumber(io);
  });

  socket.on("total_pending_doc", (user_id) => {
    total_pending_doc(user_id, socket);
  });

  socket.on("document_logs", () => {
    document_logs(io);
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
