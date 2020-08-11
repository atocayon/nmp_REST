const usersList = require("../../common/ListOfUsers");
const usersLogin = require("./usersLogin");
const usersLogout = require("./usersLogout");
const userRegistration = require("../../common/UserRegistration");
const userInfo = require("../../common/Get_UserInfo");

const document_trackingNumber = require("./document_trackingNumber");
const document_action = require("./document_action");
const doc_category = require("./document_category");
const document_info = require("./document_info");
const document_action_req = require("./document_action_req");
const document_destination = require("./document_destination");
const document_sched_released = require("./document_sched_released");

const division_list = require("../../common/ManageDivisions/divisions_list");
const division_info = require("../../common/ManageDivisions/division_info");
const new_division = require("../../common/ManageDivisions/new_division");
const update_division = require("../../common/ManageDivisions/update_division");
const delete_division = require("../../common/ManageDivisions/delete_division");



const dtsModel = {
  usersList: usersList,
  usersLogin: usersLogin,
  usersLogout: usersLogout,
  userRegistration: userRegistration,
  userInfo: userInfo,

  document_trackingNumber: document_trackingNumber,
  document_action: document_action,
  doc_category: doc_category,
  document_info: document_info,
  document_action_req:document_action_req,
  document_destination: document_destination,
  document_sched_released: document_sched_released,

  division_list: division_list,
  division_info: division_info,
  new_division: new_division,
  update_division: update_division,
  delete_division: delete_division,
};

module.exports = dtsModel;
