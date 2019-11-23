const github = require("octonode");
const inquirer = require("./inquirer");

/*
const CLI = require("clui");
const Spinner = CLI.Spinner;
const status = new Spinner("Authenticating you, please wait...");
status.start();
status.stop();
*/

module.exports = {
  //Setup a client so we can query the github rest api
  buildLoggedInGitClient: async () => {
    const credentials = await inquirer.askGithubCredentials();
    var client = github.client({
      username: credentials.username,
      password: credentials.password
    });
    console.log("Successfully created git client");
    return client;
  },
  //Setup a client so we can query the github rest api
  buildGitClient: async () => {
    var client = github.client();
    console.log("Successfully created git client");
    return client;
  },
  //Make a simple request to get current signed in users data
  getUserDetails: async (client, username) => {
    client.get("/users/" + username, {}, function(err, status, body, headers) {
      console.log(body); //json object
    });
  },
  //Make a request to get a users followers
  getFollowers: async (client, username) => {
    client.get("/users/" + username + "/followers", {}, function(
      err,
      status,
      body,
      headers
    ) {
      console.log(body); //json object
    });
  },
  //Make a request to get a users repos
  getRepos: async (client, username) => {
    client.get("/users/" + username + "/repos", {}, function(
      err,
      status,
      body,
      headers
    ) {
      console.log(body); //json object
    });
  },
  //Make a request to get a repos commits
  getCommits: async (client, username, reponame) => {
    client.get("/repos/" + username + "/" + reponame + "/commits", {}, function(
      err,
      status,
      body,
      headers
    ) {
      console.log(body); //json object
    });
  }
};
