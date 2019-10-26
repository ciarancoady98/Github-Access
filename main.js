const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'nodeserver', 
     password: 'nodeserver',
     connectionLimit: 5
});

pool.getConnection()
    .then(conn => { 
      conn.query("use githubaccess")
          .then((whatIsReturned) => {
            console.log(whatIsReturned);
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
    })