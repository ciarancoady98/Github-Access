const chalk = require("chalk");
const figlet = require("figlet");
const github = require("./src/git");
const sql = require("./src/sql");
const mongodb = require("./src/mongodb");
const inquirer = require("./src/inquirer");
const parser = require("./src/parser");
const diskAccess = require("./src/diskAccess");
const textAnalysis = require("./src/textAnalysis");
const CLI = require("clui");
const Spinner = CLI.Spinner;

async function fetchUserInfo(githubClient, textAnalysisClient, username) {
  let rawRepos = await github.getRepos(githubClient, username);
  console.log("retreived rawRepos for " + username);
  let parsedRepos = parser.parseUserRepos(rawRepos, username);
  console.log("parsed repos for " + username);
  let rawCommits = [];
  for (let i = 0; i < parsedRepos.length; i++) {
    let singleRepoCommits = await github.getCommits(
      githubClient,
      username,
      parsedRepos[i]
    );
    rawCommits.push(singleRepoCommits);
  }
  console.log("retreived rawCommits for " + username);
  let parsedCommits = parser.parseRepoCommits(rawCommits, username);
  console.log("parsed commits for " + username);
  let documentsForSentimentAnalysis = parser.parseCommitsForSentimentAnalysis(
    parsedCommits
  );
  console.log("setup documents for sentiment analysis for " + username);
  let documentResults = await textAnalysis
    .sentimentAnalysis(textAnalysisClient, documentsForSentimentAnalysis)
    .catch(error => {
      console.log(error);
    });
  console.log("Retreived sentiment of " + username + "'s commits");

  let overallresults = {
    username: userdetails.username,
    repos: parsedRepos,
    commits: parsedCommits,
    sentiment: documentResults
  };
  console.log("saving results to disk as a backup");
  let overallResultsString = JSON.stringify(overallresults);
  await diskAccess.writeToFile(overallResultsString, username);
  return overallresults;
}

//Mainline
async function start() {
  //Pretty print program name
  console.log(
    chalk.yellow(figlet.textSync("Github Access", { horizontalLayout: "full" }))
  );

  // //Build a github client
  // let githubClient = null;
  // await github
  //   .buildLoggedInGitClient()
  //   .then(success => {
  //     if (success != null) {
  //       console.log("A github client was created successfully");
  //       githubClient = success;
  //     } else
  //       throw "I'm afraid something has gone horribly wrong! No github client for you!";
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  // //Build an azure text analysis client
  // let textAnalysisClient = null;
  // await textAnalysis
  //   .createTextAnalysisClient()
  //   .then(success => {
  //     if (success != null) {
  //       console.log("A azure client was created successfully");
  //       textAnalysisClient = success;
  //     } else
  //       throw "I'm afraid something has gone horribly wrong! No azure client for you!";
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  //Build a mongo client
  await mongodb
    .setupMongoClientDetails()
    .then(success => {
      console.log("successfully setup mongo client details");
    })
    .catch(error => {
      console.log(error);
    });

  // //Ask the user for the base user they wish to analyse
  // let userdetails;
  // await inquirer
  //   .askForInitialUsername()
  //   .then(ruserdetails => {
  //     console.log(ruserdetails);
  //     userdetails = ruserdetails;
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  //pretty print the users details along with all their repos and commits

  let overallresults = {
    username: "test",
    repos: "test",
    commits: "test",
    sentiment: "test"
  };

  //get followers returns a json containing
  //status: 200, [{ login: "username1" }, { login: "username2" }];
  console.log("storing results in mongo");
  await mongodb
    .getMongoContents()
    .then(success => {
      console.log("successfully pulled mongo contents");
      console.log(success);
      mongoContents = success;
    })
    .catch(error => {
      console.log(error);
    });
  console.log("getting username ciarancoady98");
  await mongodb
    .getUserFromMongo("ciarancoady98")
    .then(success => {
      console.log("successfully retreived from mongo");
      console.log(success);
    })
    .catch(error => {
      console.log(error);
    });
  console.log("getting username poop");
  await mongodb
    .getUserFromMongo("poop")
    .then(success => {
      console.log("successfully retreived from mongo");
      console.log(success);
    })
    .catch(error => {
      console.log(error);
    });

  //we are going to make a graph where every node is either a user or a commit, each user will be coloured blue, each commit will be coloured from green to red depending on sentiment
  //get the users followers
  //

  //login to sql server
  //var connectionPool = await sql.serverLogin();
}

start();
