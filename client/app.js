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
const chalk = require("chalk");
const figlet = require("figlet");
const mongodb = require("./src/mongodb");
const parser = require("./src/parser");
const diskAccess = require("./src/diskAccess");
const util = require("util");

//Mainline
async function start() {
  //Pretty print program name
  console.log(
    chalk.yellow(
      figlet.textSync("Github Visualisation", { horizontalLayout: "full" })
    )
  );

  //Setup a mongo client uri
  await mongodb
    .setupMongoClientDetails()
    .then(success => {
      console.log("successfully setup mongo client uri");
    })
    .catch(error => {
      console.log(error);
    });

  let databaseContents = null;
  await mongodb
    .getMongoContents()
    .then(success => {
      console.log(success);
      databaseContents = success;
    })
    .catch(error => {
      console.log(error);
    });

  parsedDataSet = parser.parseDatabaseForVisualisation(databaseContents);
  //console.log(parsedDataSet);

  let parsedDataSetString = util.inspect(parsedDataSet, {
    maxArrayLength: null
  }); //JSON.stringify(parsedDataSet);
  await diskAccess.writeToFile(parsedDataSetString, "dataset");

  //we are going to make a graph where every node is either a user or a commit, each user will be coloured blue, each commit will be coloured from green to red depending on sentiment
  //get the users followers
  //
}

start();
