const chalk = require("chalk");
const figlet = require("figlet");
const github = require("./src/git");
const sql = require("./src/sql");
const inquirer = require("./src/inquirer");

//Mainline
async function start() {
  //Pretty print program name
  console.log(
    chalk.yellow(figlet.textSync("Github Access", { horizontalLayout: "full" }))
  );

  //setGithubCredentials
  let githubClient = null;
  await github
    .buildGitClient()
    .then(success => {
      if (success != null) {
        console.log("A github client was created successfully");
        githubClient = success;
      } else
        throw "i'm afraid something has gone horribly wrong! no client for you!";
    })
    .catch(error => {
      console.log(error);
    });
  //login to sql server
  //var connectionPool = await sql.serverLogin();
  console.log(githubClient);
  //Ask the user for the base user they wish to analyse
  let userdetails;
  await inquirer
    .askForInitialUsername()
    .then(ruserdetails => {
      console.log(ruserdetails);
      userdetails = ruserdetails;
    })
    .catch(error => {
      console.log("oh no an error occured!");
    });
  //get the users repos and save the repo names
  github.getFollowers(githubClient, userdetails.username);
  //get all the commits for each repo
  //pretty print the users details along with all their repos and commits

  //we are going to make a graph where every node is either a user or a commit, each user will be coloured blue, each commit will be coloured from green to red depending on sentiment
  //get the users followers
  //
}

start();
