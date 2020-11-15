const userInfo = require("../../common/Get_UserInfo");
const update_user_info = require("../../common/User_Management/update_user");
const user_login = require("../../common/User_Management/usersLogin");
const user_logout = require("../../common/User_Management/usersLogout");
const sectionList = require("../../common/ManageSections/section_list");
const new_job_request = require("./new_job_request");
const client_job_request = require("./client_job_requests");
const web_upload = require("./web_upload");
const web_upload_requests = require("./web_upload_lists");
const users_changePass_codeGenerate = require("../../common/GenerateCode");
const users_changePassword = require("../../common/ChangePassword");
const validateCode = require("../../common/ValdateCode");
const job_requests = require("./job_requests");
const job_request_action = require("./job_request_action");
const admin_job_list = require("./admin_job_list");
const job_request_logs = require("./job_request_logs");
const admin_job_request_reports = require("./admin_job_request_reports");
const admin_web_upload_list = require("./admin_web_upload_list");
const admin_web_upload_request = require("./admin_web_upload_request");
const web_upload_request_action = require("./web_upload_request_action");
const fetch_total_task_rendered_office = require("./fetch_total_task_rendered_office");
const fetch_total_task_rendered = require("./fetch_total_task_rendered");
const job_request_confirmation = require("./job_request_confirmation");
const done_job_action = require("./done_job_action");
const workQueueModel = {
  done_job_action,
  userInfo,
  update_user_info,
  user_login,
  user_logout,
  sectionList,
  new_job_request,
  client_job_request,
  web_upload,
  admin_web_upload_list,
  web_upload_lists: web_upload_requests.web_upload_lists,
  web_upload_destination: web_upload_requests.web_upload_destination,
  web_upload_file: web_upload_requests.web_upload_file,
  web_upload_logs: web_upload_requests.web_upload_logs,
  users_changePass_codeGenerate,
  users_changePassword,
  validateCode,
  job_requests,
  job_request_action,
  admin_job_list,
  job_request_logs,
  admin_job_request_reports,
  admin_web_upload_request,
  web_upload_request_action,
  fetch_total_task_rendered_office,
  fetch_task_year: fetch_total_task_rendered.fetch_task_year,
  fetch_month_in_task_year: fetch_total_task_rendered.fetch_month_in_task_year,
  fetch_tasks_per_month_in_task_year:
    fetch_total_task_rendered.fetch_tasks_per_month_in_task_year,
  job_request_confirmation,
};

module.exports = workQueueModel;
