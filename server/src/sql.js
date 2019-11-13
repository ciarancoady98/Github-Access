const mariadb = require("mariadb");
const inquirer = require("./inquirer");

module.exports = {
  /*
  Setup a connection to the database to store
  the results of our queries
  */
  serverLogin: async () => {
    const sqlCredentials = await inquirer.askSqlCredentials();
    const pool = mariadb.createPool({
      host: "localhost",
      user: sqlCredentials.username,
      password: sqlCredentials.password,
      connectionLimit: 5
    });
    return pool;
  },
  makeQuery: async pool => {
    pool
      .getConnection()
      .then(conn => {
        conn
          .query("use githubaccess")
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            //output error to console
            console.log(err);
            conn.end();
          });
      })
      .catch(err => {
        //unable to esablish connection
        console.log("Unable to esablish connection to db");
        console.log(err);
      });
  }
};
