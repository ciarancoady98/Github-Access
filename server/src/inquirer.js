const inquirer = require("inquirer");

module.exports = {
  askGithubCredentials: () => {
    const questions = [
      {
        name: "username",
        type: "input",
        message: "Enter your GitHub username or e-mail address:",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your username or e-mail address.";
          }
        }
      },
      {
        name: "password",
        type: "password",
        message: "Enter your password:",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your password.";
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askSqlCredentials: () => {
    const questions = [
      {
        name: "username",
        type: "input",
        message: "Enter your sql username:",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your username.";
          }
        }
      },
      {
        name: "password",
        type: "password",
        message: "Enter your password:",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your password.";
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askForInitialUsername: () => {
    const questions = [
      {
        name: "username",
        type: "input",
        message: "Please enter the username you wish to start analysis from:",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Please a username.";
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askForMongoPassword: () => {
    const questions = [
      {
        name: "password",
        type: "password",
        message: "Please enter your mongo password:",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Please a password.";
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  }
};
