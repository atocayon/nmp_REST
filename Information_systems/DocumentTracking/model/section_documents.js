const db = require("../../../config/Database_config/db");

const section_documents = (user_id, folder_name, res) => {
  const fetchUser = "SELECT * FROM users WHERE user_id = ?";
  db().query(fetchUser, [parseInt(user_id)], function (err, user_id, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    const fetchCategory =
      "SELECT a.id AS id,a.category AS category FROM doc_category a WHERE a.section_id = ? AND a.category = ?";
    db().query(fetchCategory, [user_id[0].section, folder_name], function (
      err,
      category,
      fields
    ) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      let sql = "";
      sql += "SELECT a.documentID as documentID, ";
      sql += "a.subject as subject, ";
      sql += "a.doc_type as docType_id, ";
      sql += "a.note as note, ";
      sql += "b.type as docType, ";
      sql += "a.creator as creatorID, ";
      sql += "d.name as creator ";
      sql += "FROM documents a ";
      sql += "LEFT JOIN document_type b ";
      sql += "ON a.doc_type = b.id ";
      sql += "LEFT JOIN users d ";
      sql += "ON a.creator = d.user_id ";
      sql += "WHERE d.section = ? ";
      sql += "AND a.status = ? ";
      sql += "AND a.ref = ? ";
      sql += "AND a.category = ? ";
      sql += "ORDER BY a.date_time_created DESC ";
      db().query(sql, [user_id[0].section, "1", "0", category[0].id], function (
        err,
        rows,
        fields
      ) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }

        return res.status(200).send(rows);
      });
    });
  });
};

module.exports = section_documents;
