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

  let rawRepos = await github.getRepos(githubClient, userdetails.username);
  console.log("retreived rawRepos");
  let parsedRepos = parser.parseUserRepos(rawRepos, userdetails.username);
  console.log("parsed repos");
  let rawCommits = [];
  for (let i = 0; i < parsedRepos.length; i++) {
    let singleRepoCommits = await github.getCommits(
      githubClient,
      userdetails.username,
      parsedRepos[i]
    );
    rawCommits.push(singleRepoCommits);
  }
  console.log("retreived rawCommits");
  let parsedCommits = parser.parseRepoCommits(rawCommits, userdetails.username);
  console.log("parsed commits");
  let documentsForSentimentAnalysis = parser.parseCommitsForSentimentAnalysis(
    parsedCommits
  );
  console.log("setup documents of sentiment analysis");
  // console.log(documentsForSentimentAnalysis);
  // console.log(documentsForSentimentAnalysis.length);
  let sentiments = [];
  for (let i = 0; i < documentsForSentimentAnalysis.length; i++) {
    let documentResults = await textAnalysis.sentimentAnalysis(
      textAnalysisClient,
      documentsForSentimentAnalysis
    );
    sentiments.push(documentResults);
  }
  console.log(sentiments);

  let overallresults = {
    username: userdetails.username,
    repos: parsedRepos,
    commits: parsedCommits,
    sentiment: sentiments
  };
  let overallResultsString = JSON.stringify(overallresults);
  await diskAccess.writeToFile(overallResultsString);

  //pretty print the users details along with all their repos and commits

  //get followers returns a json containing
  //status: 200, [{ login: "username1" }, { login: "username2" }];

  //Build a mongo client
  // let mongoClient = await mongodb.buildMongoClient();
  // await mongodb.connectToMongo(mongoClient);

  //we are going to make a graph where every node is either a user or a commit, each user will be coloured blue, each commit will be coloured from green to red depending on sentiment
  //get the users followers
  //

  //login to sql server
  //var connectionPool = await sql.serverLogin();
}

start();
