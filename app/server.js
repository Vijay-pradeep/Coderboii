const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

const db = new sqlite3.Database("./users.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT
)`);

app.get("/search", (req, res) => {
 const name = req.query.name;
 db.get("SELECT * FROM users WHERE name=?", [name], (err, row) => {
   if (row) res.json({ msg: "Yes your name is there" });
   else res.json({ msg: "User not found" });
 });
});

app.post("/add", (req, res) => {
 db.run("INSERT INTO users(name) VALUES(?)", [req.body.name]);
 res.json({ msg: "User added" });
});

app.listen(3000, () => console.log("Running on 3000"));
