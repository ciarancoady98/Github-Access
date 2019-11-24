const chalk = require("chalk");
const figlet = require("figlet");
const github = require("./src/git");
const sql = require("./src/sql");
const inquirer = require("./src/inquirer");
const parser = require("./src/parser");
const diskAccess = require("./src/diskAccess");
const CLI = require("clui");
const Spinner = CLI.Spinner;

//This function will get all the repos and commit messages for a given user
async function fetchUserInfo(githubClient, username) {
  //get the users repos and save the repo names
  let repoNames = [];
  await github
    .getRepos(githubClient, username)
    .then(success => {
      repoNames = parser.parseFollowers(success);
      console.log("Successfully parsed " + username + "'s repos");
    })
    .catch(error => {
      console.log(error);
    });

  //get all the commits for each repo
  //[{commit: {message: "de message"}
  //  author: {login: "ciarancoady98"}
  //}]
  let userInfo = { repoNames: [], repoCommits: [] };

  for (let i = 0; i < repoNames.length; i++) {
    await github
      .getCommits(githubClient, username, repoNames[i])
      .then(success => {
        userInfo.repoNames.push(repoNames[i]);
        userInfo.repoCommits.push(parser.parseRepoCommits(success, username));
      })
      .catch(error => {
        console.log(error);
      });
  }
  //console.log(userInfo);
  return userInfo;
}

//Mainline
async function start() {
  //Pretty print program name
  console.log(
    chalk.yellow(figlet.textSync("Github Access", { horizontalLayout: "full" }))
  );

  //Build a github client
  let githubClient = null;
  await github
    .buildLoggedInGitClient()
    .then(success => {
      if (success != null) {
        console.log("A github client was created successfully");
        githubClient = success;
      } else
        throw "I'm afraid something has gone horribly wrong! No client for you!";
    })
    .catch(error => {
      console.log(error);
    });

  //login to sql server
  //var connectionPool = await sql.serverLogin();

  //Ask the user for the base user they wish to analyse
  let userdetails;
  await inquirer
    .askForInitialUsername()
    .then(ruserdetails => {
      console.log(ruserdetails);
      userdetails = ruserdetails;
    })
    .catch(error => {
      console.log(error);
    });

  //github.checkRateLimit(githubClient);
  let userInfo = await fetchUserInfo(githubClient, userdetails.username);
  let userInfoString = JSON.stringify(userInfo);
  await diskAccess.writeToFile(userInfoString);

  console.log("me annoying");
  //pretty print the users details along with all their repos and commits

  //get followers returns a json containing
  //status: 200, [{ login: "username1" }, { login: "username2" }];

  //we are going to make a graph where every node is either a user or a commit, each user will be coloured blue, each commit will be coloured from green to red depending on sentiment
  //get the users followers
  //
}

start();
