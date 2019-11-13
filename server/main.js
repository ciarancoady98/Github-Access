const password = require('./password');
const mariadb = require('mariadb');
const github = require('octonode');
const chalk = require('chalk');
const figlet = require('figlet');


console.log(
  chalk.yellow(
    figlet.textSync('Github Access', { horizontalLayout: 'full' })
  )
);

const inquirer  = require('./src/inquirer');
const run = async () => {
  const gitCredentials = await inquirer.askGithubCredentials();
  console.log(gitCredentials);
  const sqlCredentials = await inquirer.askSqlCredentials();
  console.log(sqlCredentials);
};
run();

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