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
  //Setup a logged in client so we can query the github rest api
  buildLoggedInGitClient: async () => {
    const credentials = await inquirer.askGithubCredentials();
    var client = github.client({
      username: credentials.username,
      password: credentials.password
    });
    return client;
  },
  //Setup a generic client so we can query the github rest api
  buildGitClient: async () => {
    try {
      throw "we've shit the bed!";
      var client = github.client();
      return client;
    } catch (error) {
      console.log("an error occured while trying to create the github client");
      return null;
    } finally {
      console.log("buildGitClient() ran");
    }
  },
  //Make a simple request to get current signed in users data
  getUserDetails: async (client, username) => {
    let userdetails = null;
    client.get("/users/" + username, {}, function(err, status, body, headers) {
      userdetails = { username: body.login, userid: body.id };
      console.log(userdetails); //json object
    });
    return userdetails;
  },
  //Make a request to get a users followers
  getFollowers: async (client, username) => {
    client.get("/users/" + username + "/followers", {}, function(
      err,
      status,
      body,
      headers
    ) {
      console.log("status: " + status);
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
