const userInfo = require("../../common/Get_UserInfo");
const user_login = require("../../common/User_Management/usersLogin");
const user_logout = require("../../common/User_Management/usersLogout");
const sectionList = require("../../common/ManageSections/section_list");
const new_job_request = require("./new_job_request");
const client_job_request = require("./client_job_requests");
const workQueueModel = {
  userInfo: userInfo,
  user_login: user_login,
  user_logout: user_logout,
  sectionList: sectionList,
  new_job_request: new_job_request,
  client_job_request: client_job_request
};

module.exports = workQueueModel;
