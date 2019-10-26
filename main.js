import password from './password';

const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'nodeserver', 
     password: password,
     connectionLimit: 5
});

pool.getConnection()
    .then(conn => { 
    })