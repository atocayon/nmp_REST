const db = require("../../../config/Database_config/db");
const assign_trackingNumber = require("./document_trackingNumber");
const update_document_logs = require("./document_logs");
const dateTime = require("../../common/Get_CurrentDateTime");
const new_document = (
  document_id,
  creator,
  subject,
  doc_type,
  note,
  action_req,
  document_logs,
  category,
  io,
  res
) => {
  const check = "SELECT * FROM documents WHERE documentID = ?";
  db().query(check, [parseInt(document_id)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    if (rows.length === 0) {
      if (document_logs.length > 1) {
        const sql1 =
          "INSERT INTO documents (documentID, creator, subject, doc_type, note, status, ref, category) VALUES ?";
        let values = [
          [document_id, creator, subject, doc_type, note, "1", "0", category],
        ];
        let destination = [];
        for (let i = 0; i < document_logs.length; i++) {
          let inc = i + 1;
          values.push([
            document_id + "-" + inc,
            creator,
            subject,
            doc_type,
            note,
            "1",
            document_id,
            category,
          ]);

          destination.push([
            document_id + "-" + inc,
            document_logs[i][1],
            document_logs[i][2],
            document_logs[i][3],
            document_logs[i][4],
            document_logs[i][5],
            document_logs[i][6],
            dateTime(),
          ]);
        }

        db().query(sql1, [values], function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }

          const sql2 =
            "INSERT INTO document_action_req (documentID, action_req) VALUES ?";

          db().query(sql2, [action_req], function (err, result) {
            if (err) {
              console.log(err);
            }

            const sql3 =
              "INSERT INTO documentLogs (document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";

            db().query(sql3, [destination], function (err, result) {
              if (err) {
                console.log(err);
              }

              update_document_logs(io);
              assign_trackingNumber(io);

              return res.status(200).send("success");
            });
          });
        });
      } else {
        const sql4 =
          "INSERT INTO documents (documentID, creator, subject, doc_type, note, status, ref, category) VALUES ?";
        let values4 = [
          [document_id, creator, subject, doc_type, note, "1", "0", category],
        ];

        db().query(sql4, [values4], function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }

          const sql5 =
            "INSERT INTO document_action_req (documentID, action_req) VALUES ?";

          db().query(sql5, [action_req], function (err, result) {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }

            const sql5 =
              "INSERT INTO documentLogs (document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";
            const values5 = [
              [
                document_id,
                document_logs[0][1],
                document_logs[0][2],
                document_logs[0][3],
                document_logs[0][4],
                document_logs[0][5],
                document_logs[0][6],
                dateTime(),
              ],
            ];
            db().query(sql5, [values5], function (err, result) {
              if (err) {
                console.log(err);
                return res.status(500).send(err);
              }

              update_document_logs(io);
              assign_trackingNumber(io);

              return res.status(200).send("success");
            });
          });
        });
      }
    }
  });
};

module.exports = new_document;
