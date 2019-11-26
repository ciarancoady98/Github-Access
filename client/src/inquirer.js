const inquirer = require("inquirer");

module.exports = {
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
