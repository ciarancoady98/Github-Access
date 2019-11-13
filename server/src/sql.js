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