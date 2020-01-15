//Require MySQL package.
const mysql = require("mysql");
// connects to server
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_tracker"
  });
  
  connection.connect(err => {
    if (err) throw err;
  });


//Exporting the file so it can be used in other files.
module.exports = connection;