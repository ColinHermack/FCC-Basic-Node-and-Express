const bodyParser = require("body-parser");
let express = require("express");
let app = express();

console.log("Hello World");

//app.get("/", (req, res) => res.send("Hello Express")););

app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  },
);

app.get("/:word/echo", (req, res) => {
  res.send({ echo: req.params.word });
});

app.route("/name").get(function (req, res) {
  res.json({ name: req.query.first + " " + req.query.last });
});

app.get("/json", (req, res) => {
  if (process.env["MESSAGE_STYLE"] === "uppercase") {
    return res.json({ message: "HELLO JSON" });
  } else {
    return res.json({ message: "Hello json" });
  }
});
module.exports = app;
