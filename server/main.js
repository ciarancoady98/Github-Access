const password = require('./password');
const mariadb = require('mariadb');
const github = require('octonode');
var standard_input = process.stdin;




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
var client = github.client({
  username: 'user',
  password: 'password'
});
*/
var client = github.client();
client.get('/users/pksunkara', {}, function (err, status, body, headers) {
  console.log(body); //json object
});
client.limit(function (err, left, max, reset) {
  console.log(left); // 4999
  console.log(max);  // 5000
  console.log(reset);  // 1372700873 (UTC epoch seconds)
});




/*
  Handling user input from the console
*/
// Set input character encoding.
standard_input.setEncoding('utf-8');
// Prompt user to input data in console.
console.log("Please input text in command line.");
// When user input data and click enter key.
standard_input.on('data', function (data) {
    // User input exit.
    if(data === 'exit\n'){
        // Program exit.
        console.log("User input complete, program exit.");
        process.exit();
    }else
    {
        // Print user input in console.
        console.log('User Input Data : ' + data);
    }
});