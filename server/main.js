const password = require('./password');
const mariadb = require('mariadb');
const github = require('octonode');
var readline = require('readline');

/* Get the git password from stdin */
var ioStream = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
/* Confifure console output to no show passwords in plain text */
ioStream.stdoutMuted = true;
ioStream._writeToOutput = function _writeToOutput(stringToWrite) {
  if (ioStream.stdoutMuted)
    ioStream.output.write("*");
  else
    ioStream.output.write(stringToWrite);
};
ioStream.stdoutMuted = false;
ioStream.question('Please enter the github password for current user : ', function(password) {
  loginGitUser(password);
  ioStream.close();
});

function loginGitUser(password){
  console.log("You entered : " + password);
}

/*
  Setup a connection to the database to store
  the results of our queries
*/
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'nodeserver', 
     password: password,
     connectionLimit: 5
});

pool.getConnection()
    .then(conn => { 
      conn.query("use githubaccess")
          .then((result) => {
            console.log(result);
          })
          .catch(err => {
          //output error to console
          console.log(err);
          conn.end();
      })
    })
    .catch(err => {
      //unable to esablish connection
      console.log("Unable to esablish connection to db");
      console.log(err);
    });

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