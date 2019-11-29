const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

//Tell express that we are hosting static files
app.use(express.static(path.join(__dirname, "public")));

//Viewed at http://localhost:8080
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

//Setup the server to listen for requestions on the specified port
app.listen(port, error => {
  if (error) {
    return console.log("something has gone wrong " + error);
  }
  console.log(`Server is listening on port: ${port}`);
});
