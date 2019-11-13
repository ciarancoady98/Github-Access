const password = require('./password');
const mariadb = require('mariadb');
const github = require('octonode');
const chalk = require('chalk');
const figlet = require('figlet');


//Mainline
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

