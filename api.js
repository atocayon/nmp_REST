const http = require("http");

const express = require('express');
const api = express();
const socketIO = require("socket.io");
const http_server = http.createServer(api);
const io = socketIO(http_server);

const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const db = require("./db");
require("dotenv/config");


api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: false}));


//Token Verification
const tokenVerification = require("./Token/verification");

//Import Routes for Document Tracking System
const userRoute = require("./DocumentTracking/userRoute/user");

db();

//Routes Document Tracking System
api.use("/dts", tokenVerification);

//Route Work Queue Information system
api.use("/work-queue", tokenVerification);

api.listen(process.env.PORT);