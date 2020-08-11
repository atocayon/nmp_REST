const db = require("../../../config/Database_config/db");

const update_division = (depid, department, depshort, payrollshort, res) => {
  const sql =
    "UPDATE divisions SET department = ?, depshort = ?, payrollshort = ? WHERE depid = ?";
  db().query(
    sql,
    [department, depshort, payrollshort, parseInt(depid)],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      return res.status(200).send("success");
    }
  );
};

module.exports = update_division;
