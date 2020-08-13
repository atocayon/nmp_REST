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
const document_action_taken = require("./document_action_taken");
const document_barcode = require("./document_barcode");
const document_barcodes = require("./document_barcodes");
const document_route_type = require("./document_route_type");
const document_current_status = require("./document_current_status");

const document_types = require("./document_types");
const document_type_info = require("./document_type_info");
const new_document_type = require("./new_document_type");
const update_document_type = require("./update_document_type");
const delete_document_type = require("./delete_document_type");

const pending_documents = require("./pending_documents");

const user_document_logs = require("./user_document_logs");

const section_documents = require("./section_documents");

const division_list = require("../../common/ManageDivisions/divisions_list");
const division_info = require("../../common/ManageDivisions/division_info");
const new_division = require("../../common/ManageDivisions/new_division");
const update_division = require("../../common/ManageDivisions/update_division");
const delete_division = require("../../common/ManageDivisions/delete_division");

const section_list = require("../../common/ManageSections/section_list");
const section_info = require("../../common/ManageSections/section_info");
const new_section = require("../../common/ManageSections/new_section");
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
  document_action_req: document_action_req,
  document_destination: document_destination,
  document_sched_released: document_sched_released,
  document_action_taken: document_action_taken,
  document_barcode: document_barcode,
  document_barcodes: document_barcodes,
  document_route_type: document_route_type,
  document_current_status: document_current_status,

  document_types: document_types,
  document_type_info: document_type_info,
  new_document_type: new_document_type,
  update_document_type: update_document_type,
  delete_document_type: delete_document_type,

  pending_documents: pending_documents,

  user_document_logs: user_document_logs,

  section_documents: section_documents,

  division_list: division_list,
  division_info: division_info,
  new_division: new_division,
  update_division: update_division,
  delete_division: delete_division,

  section_list: section_list,
  section_info: section_info,
  new_section: new_section
};

module.exports = dtsModel;
