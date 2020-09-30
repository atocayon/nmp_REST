const express = require("express");
const router = express.Router();
const db = require("../../../config/Database_config/db");

router.post("/", (req, res) => {
  const { token } = req.body;

  const sql = "SELECT * FROM users_session WHERE userId = ?";
  db().query(sql, [token], function (err, rows, fields) {
      if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows[0]);
    res.status(200).json(rows[0]);
  });
});

module.exports = router;
