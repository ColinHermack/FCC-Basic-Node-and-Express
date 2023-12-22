let express = require("express");
let app = express();

console.log("Hello World");

//app.get("/", (req, res) => res.send("Hello Express")););

app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

module.exports = app;
