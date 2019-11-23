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
  buildGitClient: async () => {
    const credentials = await inquirer.askGithubCredentials();
    var client = github.client({
      username: credentials.username,
      password: credentials.password
    });
    console.log("Successfully created git client");
    return client;
  },
  //Make a simple request to get current signed in users data
  makeGitRequest: async client => {
    client.get("/user", {}, function(err, status, body, headers) {
      console.log(body); //json object
    });
  },
  //Make a request to get the logged in users followers
  getFollowers: async client => {
    client.get("/user/followers", {}, function(err, status, body, headers) {
      console.log(body); //json object
    });
  }
};
