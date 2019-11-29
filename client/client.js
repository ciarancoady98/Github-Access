// const path = require("path");
// const express = require("express");
// const exphbs = require("express-handlebars");
// const app = express();
// const port = 1234;

// app.engine(
//   ".hbs",
//   exphbs({
//     defaultLayout: "main",
//     extname: ".hbs",
//     layoutsDir: path.join(__dirname, "views/layouts")
//   })
// );
// app.set("view engine", ".hbs");
// app.set("views", path.join(__dirname, "views"));

// app.get("/", (req, res) => {
//   res.render("home", { name: "ciaran" });
// });

// app.listen(port, error => {
//   if (error) {
//     return console.log("something has gone wrong " + error);
//   }
//   console.log(`Server is listening on port: ${port}`);
// });

var express = require("express");
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static("public"));

// viewed at http://localhost:8080
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(8080);
