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
    var client = github.client();
    return client;
  },
  //Make a simple request to get current signed in users data
  getUserDetails: async (client, username) => {
    return new Promise(resolve => {
      client.get("/users/" + username, (err, status, body, headers) => {
        //console.log("we are resolving the promise");
        let userdetails = { username: body.login, userid: body.id };
        resolve(userdetails);
      });
    });
  },
  //Make a request to get a users followers
  getFollowers: async (client, username) => {
    return new Promise(resolve => {
      client.get(
        "/users/" + username + "/followers",
        (err, status, body, headers) => {
          //console.log("we are resolving the promise");
          resolve(body);
        }
      );
    });
  },
  //Make a request to get a users repos
  getRepos: async (client, username) => {
    return new Promise(resolve => {
      client.get(
        "/users/" + username + "/repos",
        (err, status, body, headers) => {
          //console.log("we are resolving the promise");
          resolve(body);
        }
      );
    });
  },
  //Make a request to get a repos commits
  getCommits: async (client, username, reponame) => {
    return new Promise(resolve => {
      client.get(
        "/repos/" + username + "/" + reponame + "/commits",
        (err, status, body, headers) => {
          //console.log("we are resolving the promise");
          resolve(body);
        }
      );
    });
  }
};
