const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/logs", (req, res) => {
  db.query("SELECT * FROM logs ORDER BY start_at DESC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/store", (req, res) => {
  const startat = req.body.startat;
  const endat = req.body.endat;
  const description = req.body.description;
  db.query(
    "INSERT INTO logs (start_at, 	end_at, description) VALUES (?,?,?)",
    [startat, endat, description],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM logs WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
