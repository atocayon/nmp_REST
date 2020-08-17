const db = require("../../../config/Database_config/db");
const email = require("../../../config/Email_config/email_config");
const total_pending_documents = require("./total_pending_documents");
const dateTime = require("../../common/Get_CurrentDateTime");
const receive_document = (
  documentTracking,
  user_id,
  user_section,
  callback,
  socket
) => {
  const sql = "SELECT * FROM documentLogs WHERE document_id = ?";

  db().query(sql, [documentTracking], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        if (
          rows[i].destinationType === "Internal" &&
          rows[i].status === "1" &&
          rows[i].user_id === user_id &&
          rows[i].user_id === user_id &&
          rows[i].notification === "0"
        ) {
          console.log("gn receive na ini");
          callback("failed");
          break;
        }
        if (
          rows[i].destinationType === "External" &&
          rows[i].user_id === user_id &&
          rows[i].status === "2"
        ) {
          const insertExternal =
            "INSERT INTO documentLogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";
          const val = [
            [
              documentTracking,
              user_id,
              "none",
              "External",
              "none",
              "1",
              "0",
              dateTime,
            ],
          ];
          db().query(insertExternal, [val], function (err, result) {
            if (err) {
              console.log(err);
              return callback("server error");
            }

            total_pending_documents(user_id, socket);

            return callback("success");
          });
          break;
        }

        if (
          rows[i].destinationType === "Internal" &&
          rows[i].destination === user_section &&
          rows[i].status === "2" &&
          rows[i].notification === "0"
        ) {
          let insertInternal = "";
          insertInternal += "INSERT INTO documentLogs ";
          insertInternal += "(document_id, ";
          insertInternal += "user_id, ";
          insertInternal += "remarks, ";
          insertInternal += "destinationType, ";
          insertInternal += "destination, ";
          insertInternal += "status, ";
          insertInternal += "notification, date_time) ";
          insertInternal += "VALUES ? ";
          const val1 = [
            [
              documentTracking,
              user_id,
              "none",
              "Internal",
              "none",
              "1",
              "0",
              dateTime,
            ],
          ];
          db().query(insertInternal, [val1], function (err, result) {
            if (err) {
              console.log(err);
              return callback("server error");
            }

            const selectForwarderAndReceiver =
              "SELECT b.secshort FROM users a JOIN sections b ON a.section = b.secid WHERE a.user_id = ?";
            db().query(
              selectForwarderAndReceiver,
              [parseInt(rows[i].user_id)],
              function (err, res_ForwarderAndReceiver, fields) {
                if (err) {
                  console.log(err);
                  return callback("server error");
                }

                const selectEmailDestination =
                  "SELECT a.email FROM users a JOIN sections b ON a.section = b.secid WHERE b.secshort = ?";
                db().query(
                  selectEmailDestination,
                  [res_ForwarderAndReceiver[0].secshort],
                  function (err, res_emailDes, fields) {
                    if (err) {
                      console.log(err);
                      return callback("server error");
                    }

                    db().query(
                      selectForwarderAndReceiver,
                      [parseInt(user_id)],
                      function (err, res_receiver, fields) {
                        if (err) {
                          console.log(err);
                          return callback("server error");
                        }

                        for (let x = 0; x < res_emailDes.length; x++) {
                          let mailOptions = {
                            from: "nationalmaritimepolytechnic@gmail.com",
                            to: res_emailDes[x].email,
                            subject: "NMP|DTS Notification",
                            text:
                              res_receiver[0].secshort +
                              " received a document from your office/unit/section with a Document Tracking Number : " +
                              documentTracking,
                          };

                          email().sendMail(mailOptions, function (error, info) {
                            if (error) {
                              console.log(error);
                            } else {
                              console.log("Email sent: " + info.response);

                              const update =
                                "UPDATE documentLogs SET notification =  ? WHERE status = ? AND destination = ? AND document_id = ?";
                              db().query(
                                update,
                                ["1", "2", user_section, documentTracking],
                                function (err, result) {
                                  if (err) {
                                    console.log(err);
                                    return callback("server error");
                                  }

                                  total_pending_documents(user_id, socket);

                                  return callback("success");
                                }
                              );
                            }
                          });
                        }
                      }
                    );
                  }
                );
              }
            );
          });
          break;
        }
      }
    }
  });
};

module.exports = receive_document;
