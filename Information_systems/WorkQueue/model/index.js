const user_login = require("../../common/User_Management/usersLogin");
const user_logout = require("../../common/User_Management/usersLogout");

const workQueueModel = {
  user_login: user_login,
  user_logout: user_logout,
};

module.exports = workQueueModel;
