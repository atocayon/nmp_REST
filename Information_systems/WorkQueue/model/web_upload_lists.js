const db = require("../../../config/Database_config/db");

const web_upload_lists = (user_id, res) => {
  let arr = [];

  let sql = "";
  sql += "SELECT ";
  sql += "a.id, ";
  sql += "a.upload_title, ";
  sql += "a.validator, ";
  sql += "DATE_FORMAT(a.date_time,'%M %d, %Y @ %h:%i:%s %p ') AS date_time_requested ";
  sql += "FROM web_upload a WHERE a.requisitioner = ?";

  db().query(sql, [user_id], async (err, res_sql, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    for (let i = 0; i < res_sql.length; i++) {
      arr.push(res_sql[i]);
    }

    return res.status(200).send(arr);
  });
};

const web_upload_destination = (res_sql_id, res) => {
  let arr = [];
  let sql = "";
  sql += "SELECT ";
  sql += "a.destination ";
  sql += "FROM web_upload_destination a ";
  sql += "WHERE a.web_upload_id = ? ";

  db().query(sql, [res_sql_id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    for (let i = 0; i < rows.length; i++) {
      arr.push(rows[i]);
    }

    return res.status(200).send(arr);
  });
};

const web_upload_file = (res_sql_id, res) => {
  let arr = [];

  let sql = "";
  sql += "SELECT ";
  sql += "a.file_name, ";
  sql += "a.file_type, ";
  sql += "a.file_size ";
  sql += "FROM web_upload_file a ";
  sql += "WHERE a.web_upload_id = ? ";

  db().query(sql, [res_sql_id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    for (let i = 0; i < rows.length; i++) {
      arr.push(rows[i]);
    }

    return res.status(200).send(arr);
  });
};

const web_upload_logs = (req_sql_id, res) => {
  let arr = [];

  let sql = "";
  sql += "SELECT ";
  sql += "a.host_computer, ";
  sql += "a.network_group, ";
  sql += "a.status, ";
  sql += "DATE_FORMAT(a.date_time,'%M %d, %Y @ %h:%i:%s %p ') AS date_time ";
  sql += "FROM web_upload_logs a ";
  sql += "WHERE a.web_upload_id = ? ";

  db().query(sql, [req_sql_id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    for (let i = 0; i < rows.length; i++) {
      arr.push(rows[i]);
    }

    return res.status(200).send(arr);
  });
};

module.exports.web_upload_lists = web_upload_lists;
module.exports.web_upload_destination = web_upload_destination;
module.exports.web_upload_file = web_upload_file;
module.exports.web_upload_logs = web_upload_logs;
