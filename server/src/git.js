const github = require("octonode");
const inquirer = require("./inquirer");
const CLI = require("clui");
const Spinner = CLI.Spinner;
/*
    Setup a client so we can query the github rest api
    Currently no authentication
*/
/*
Build a client that has access to public data

var client = github.client();
client.get('/users/pksunkara', {}, function (err, status, body, headers) {
  console.log(body); //json object
});
*/
/*
Build a client from an access token

var client = github.client('someaccesstoken');

client.get('/user', {}, function (err, status, body, headers) {
  console.log(body); //json object
});

*/

/*
build a client from credentials

var client = github.client({
  username: 'pksunkara',
  password: 'password'
});
*/
module.exports = {
  buildGitClient: async () => {
    const credentials = await inquirer.askGithubCredentials();
    var client = github.client({
      username: credentials.username,
      password: credentials.password
    });
    console.log("Successfully created git client");
    return client;
  },

  makeGitRequest: async client => {
    client.get("/user", {}, function(err, status, body, headers) {
      console.log(body); //json object
    });
  }
};
