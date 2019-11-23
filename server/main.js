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
  //login to sql server
  //var connectionPool = await sql.serverLogin();
  //make a query to switch to the desired table
  //await sql.makeQuery(connectionPool);
  //make an api call
  await github.getCommits(githubClient, "ciarancoady98", "Github-Access");
}

start();
