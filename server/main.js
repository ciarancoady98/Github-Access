const chalk = require("chalk");
const figlet = require("figlet");
const github = require("./src/git");
const sql = require("./src/sql");

//Mainline
async function start() {
  //Pretty print program name
  console.log(
    chalk.yellow(figlet.textSync("Github Access", { horizontalLayout: "full" }))
  );

  //setGithubCredentials
  var githubClient = await github.buildGitClient();

  await github.makeGitRequest(githubClient);
  //login to sql server
  //sql.serverLogin();
}

start();
