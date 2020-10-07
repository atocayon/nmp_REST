const db = require("../../../config/Database_config/db");
const date_today = require("../../common/Get_CurrentDate");
const web_upload = (requisitioner, upload_title, files, destination, res) => {
  let get_last_id = "";
  get_last_id = "SELECT id FROM web_upload ORDER BY id DESC LIMIT 1";
  db.query(get_last_id, (err, last_inserted_id, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(last_inserted_id);
    let web_upload_id =
      last_inserted_id.length > 0 ? parseInt(last_inserted_id[0].id) + 1 : 1;
    let sql = "";
    sql =
      "INSERT INTO web_upload (id, requisitioner, upload_title, validator,date_time) VALUES ?";
   

    const values = [
      [web_upload_id.toString(), requisitioner, upload_title, null ,date_today(Date.now())],
    ];

    db.query(sql, [values], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      web_upload_destination(web_upload_id, files, destination, res);
    });
  });
};

const web_upload_destination = (web_upload_id, files, destination, res) => {
  let destination_arr = [];
  for (let i = 0; i < destination.length; i++) {
    destination_arr.push([web_upload_id.toString(), destination[i]]);
  }

  let insert_destination =
    "INSERT INTO web_upload_destination (web_upload_id, destination) VALUES ?";

  db.query(insert_destination, [destination_arr], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    web_upload_file(web_upload_id, files, res);
  });
};

const web_upload_file = (web_upload_id, files, res) => {
  let files_arr = [];

  for (let x = 0; x < files.length; x++) {
    files_arr.push([
      web_upload_id.toString(),
      files[x].originalname,
      files[x].mimetype,
      files[x].size,
    ]);
  }

  let insert_file =
    "INSERT INTO web_upload_file (web_upload_id, file_name, file_type, file_size) VALUES ?";

  db.query(insert_file, [files_arr], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send("success");
  });
};

module.exports = web_upload;
