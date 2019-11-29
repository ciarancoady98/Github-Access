const github = require("octonode");
const inquirer = require("./inquirer");

//Authenticate login to increase rate limit
async function authLogin(credentials) {
  return new Promise(resolve => {
    var scopes = {
      scopes: ["user", "repo"],
      note: "Github access a command line git trawling tool"
    };
    github.auth
      .config({
        username: credentials.username,
        password: credentials.password
      })
      .login(scopes, function(err, id, token, headers) {
        //console.log(id, token);
        resolve();
      });
  });
}

async function checkRateLimit(client) {
  return new Promise(resolve => {
    client.limit((err, left, max, reset) => {
      if (left == 0) {
        let delayInMilliseconds = new Date(reset * 1000) - new Date();
        console.log(
          "We were too speedy! time to wait for the github api to stop being salty..."
        );
        console.log("we must wait " + delayInMilliseconds + "ms");
        console.log("waiting ......");
        new Promise(resolve => {
          setTimeout(() => {
            console.log("we've timed out");
            resolve();
          }, delayInMilliseconds);
        });
      }
      resolve();
    });
  });
}

module.exports = {
  //Setup a logged in client so we can query the github rest api
  buildLoggedInGitClient: async () => {
    const credentials = await inquirer.askGithubCredentials();
    await authLogin(credentials);
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
    await checkRateLimit(client);
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
    await checkRateLimit(client);
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
    await checkRateLimit(client);
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
    await checkRateLimit(client);
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
