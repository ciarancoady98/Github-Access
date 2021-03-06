const chalk = require("chalk");
const figlet = require("figlet");
const github = require("./src/git");
const mongodb = require("./src/mongodb");
const inquirer = require("./src/inquirer");
const parser = require("./src/parser");
const diskAccess = require("./src/diskAccess");
const textAnalysis = require("./src/textAnalysis");

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
  let overallResultsString = JSON.stringify(overallresults, null, 2);
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
      //console.log(ruserdetails);
      userdetails = ruserdetails;
    })
    .catch(error => {
      console.log(error);
    });

  //get users followers
  let rawFollowers = null;
  await github
    .getFollowers(githubClient, userdetails.username)
    .then(success => {
      rawFollowers = success;
    })
    .catch(error => {
      console.log(error);
    });
  let parsedFollowers = parser.parseUserFollowers(rawFollowers);
  parsedFollowers.push(userdetails.username);
  for (let i = 0; i < parsedFollowers.length; i++) {
    let username = parsedFollowers[i];
    console.log("Checking is " + username + " is in the database");
    let inDb;
    await mongodb
      .getUserFromMongo(username)
      .then(success => {
        if (success != null && success.length > 0) {
          console.log("the user " + username + " is in the database");
          //console.log(success);
          inDb = true;
        } else {
          console.log("the user " + username + " is not in the database");
          inDb = false;
        }
      })
      .catch(error => {
        console.log(error);
      });

    if (!inDb) {
      console.log("lets put this goober in the db!");
      let userInfo = await fetchUserInfo(
        githubClient,
        textAnalysisClient,
        username
      );
      console.log("storing results in mongo");
      await mongodb
        .insertInMongo(userInfo)
        .then(success => {
          console.log(
            "successfully inserted " + username + " into the database"
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  console.log(
    "------------------------------------------------------------\n" +
      "Data collection and analytics successful!!\nNow open the client app to see it visualised!!\n" +
      "------------------------------------------------------------"
  );
}

start();
