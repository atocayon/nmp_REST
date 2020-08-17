const http = require("http");

const express = require("express");
const api = express();
const socketIO = require("socket.io");
const http_server = http.createServer(api);
const io = socketIO(http_server);

const bodyParser = require("body-parser");
require("dotenv/config");

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

//Token Verification
const tokenVerification = require("./Information_systems/common/Token/verification");

//Import Routes for Document Tracking Information_systems
const dts = require("./Information_systems/DocumentTracking/controller");

//Socket.io callbacks for Document Tracking System
const userList = require("./Information_systems/common/ListOfActiveUsers/users");
const document_trackingNumber = require("./Information_systems/DocumentTracking/model/document_trackingNumber");
const total_pending_doc = require("./Information_systems/DocumentTracking/model/total_pending_documents");
const document_logs = require("./Information_systems/DocumentTracking/model/document_logs");
const receive_document = require("./Information_systems/DocumentTracking/model/receive_document");
//User Verification
api.use("/", tokenVerification); // DTS

//Routes Document Tracking Information_systems
api.use("/dts", dts);

//Route Work Queue Information Information_systems
// api.use("/work-queue");

//Socket.io connections
io.on("connection", (socket) => {
  socket.on("active_users", () => {
    userList(io);
  });

  socket.on("document_trackingNumber", () => {
    document_trackingNumber(io);
  });

  socket.on("total_pending_doc", () => {
    total_pending_doc(socket);
  });

  socket.on("document_logs", () => {
    document_logs(io);
  });

  socket.on(
    "receive_document",
    (documentTracking, user_id, user_section, callback) => {
      receive_document(socket);
    }
  );

  socket.on("disconnect", () => {
    console.log("socket connection close...");
    socket.disconnect();
  });
});

api.listen(process.env.PORT);
