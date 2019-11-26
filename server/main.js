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
    username: username,
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

  //Build a github client
  let githubClient = null;
  await github
    .buildLoggedInGitClient()
    .then(success => {
      if (success != null) {
        console.log("A github client was created successfully");
        githubClient = success;
      } else
        throw "I'm afraid something has gone horribly wrong! No github client for you!";
    })
    .catch(error => {
      console.log(error);
    });

  //Build an azure text analysis client
  let textAnalysisClient = null;
  await textAnalysis
    .createTextAnalysisClient()
    .then(success => {
      if (success != null) {
        console.log("A azure client was created successfully");
        textAnalysisClient = success;
      } else
        throw "I'm afraid something has gone horribly wrong! No azure client for you!";
    })
    .catch(error => {
      console.log(error);
    });

  //Setup a mongo client uri
  await mongodb
    .setupMongoClientDetails()
    .then(success => {
      console.log("successfully setup mongo client uri");
    })
    .catch(error => {
      console.log(error);
    });

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

  //get users followers
  let followers = null;
  await github
    .getFollowers(githubClient, userdetails.username)
    .then(success => {
      followers = success;
    })
    .catch(error => {
      console.log(error);
    });
  console.log(followers);

  // console.log("Checking is " + userdetails.username + " is in the database");
  // let inDb;
  // await mongodb
  //   .getUserFromMongo(userdetails.username)
  //   .then(success => {
  //     if (success != null && success.length > 0) {
  //       console.log("the user " + userdetails.username + " is in the database");
  //       //console.log(success);
  //       inDb = true;
  //     } else {
  //       console.log("the user is not in the database");
  //       inDb = false;
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  // if (!inDb) {
  //   console.log("lets put this goober in the db!");
  //   let userInfo = await fetchUserInfo(
  //     githubClient,
  //     textAnalysisClient,
  //     userdetails.username
  //   );
  //   console.log("storing results in mongo");
  //   await mongodb
  //     .insertInMongo(userInfo)
  //     .then(success => {
  //       console.log(
  //         "successfully inserted " + userdetails.username + " into the database"
  //       );
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // for(every follower){
  //   if they are not in the db{
  //     get their details and put them in the db
  //   }
  // }

  //get followers returns a json containing
  //status: 200, [{ login: "username1" }, { login: "username2" }];

  //we are going to make a graph where every node is either a user or a commit, each user will be coloured blue, each commit will be coloured from green to red depending on sentiment
  //get the users followers
  //

  //login to sql server
  //var connectionPool = await sql.serverLogin();
}

start();
