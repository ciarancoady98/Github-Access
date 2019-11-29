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

  //Setup the dataset to have all my followers connect to me
  parsedDataSet = parser.parseDatabaseForVisualisation(
    databaseContents,
    "ciarancoady98"
  );

  // let parsedDataSetString = util.inspect(parsedDataSet, {
  //   maxArrayLength: null
  // });
  let parsedDataSetString = JSON.stringify(parsedDataSet);
  await diskAccess.writeToFile(parsedDataSetString, "dataset");
}

start();
