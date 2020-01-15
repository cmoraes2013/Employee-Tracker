const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_tracker"
});

connection.connect(err => {
  if (err) throw err;
  mainApp();
});

function mainApp() {
  inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View Employees By Department",
          "Add New Employee",
          "Update Employee Role",
          "Delete Employee",
          "Exit"
        ]
      }
    ])
    .then(function(response) {
      switch (response.choice) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View Employees By Department":
          byDepartment();
          break;
        case "Add New Employee":
          addNewEmployee();
          break;
        case "Update Employee Role":
          updateEmployee();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        default:
          connection.end();
      }
    });
}

function viewAllEmployees() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name AS dept FROM employee JOIN employee_role ON employee_role.id = employee.role_id JOIN department on employee_role.department_id = department.id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      mainApp();
    }
  );
}

function byDepartment() {
  inquirer.prompt([
      {
        type: "input",
        name: "ID",
        message: "What is the ID of the department?"
      }
    ])
    .then(res => {
      connection.query(
        "SELECT employee.first_name AS employee_first, employee.last_name AS employee_last, employee_role.title, department.name AS dept FROM employee JOIN employee_role ON employee_role.id = employee_role.id JOIN department on employee_role.department_id = department.id WHERE department.id= ? ",[
          res.ID
        ],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          mainApp();
        }
      );
    });
}


function addNewEmployee(){
    inquirer.prompt([
     {
         type: "input",
         message: "What is the employee's first name?",
         name: "first_name"
     },
     {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name"
     },
     {
        type: "input",
        message: "What is the employee's role?",
        name: "role_id"
     },
     {
        type: "input",
        message: "What is the employee's manager ID?",
        name: "manager_id"
     }
]).then(res =>{
    connection.query("INSERT INTO employee_tracker.employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [
        res.first_name,
        res.last_name,
        res.role_id,
        res.manager_id,
    ], (err, res) => {
        if (err) throw err;
        console.log("Employee has been added:)");
        mainApp();
    });
})
}

function updateEmployee(){
    inquirer.prompt([
    {
        type: "input",
        message: "Which employee ID would you like to update?",
        name: "empid"
    },
    {
        type: "input",
        message: "What is the new employee first name?",
        name: "empfirstname"
    },
    {
        type: "input",
        message: "What is the new employee last name?",
        name: "emplastname"
    },
    {
        type: "input",
        message: "What is the employee new role id?",
        name: "roleid"
      },
      {
        type: "input",
        message: "What is the employee new manager id?",
        name: "managerid"
      }

    ]).then(res =>{
        connection.query("UPDATE employee_tracker.employee SET first_name =?, last_name =?, role_id=?, manager_id=? WHERE id=?", 
        [
            res.empfirstname,
            res.emplastname,
            res.roleid,
            res.managerid,
            res.empid
        ], (err, res) => {
            if (err) throw err;
            console.log("Employee has been updated:)");
            mainApp();
        });
    })

}

function deleteEmployee(){
    inquirer.prompt([
        {
            type: "input",
            message: "What employee would you like to delete?",
            name: "empdelete"
        }
    ]).then(res =>{
        connection.query("DELETE from employee_tracker.employee WHERE id=?",
        [
            res.empdelete
        ], (err, res) => {
            if (err) throw err;
            console.log("Employee has been deleted:)");
            mainApp();
        })
        

    })



}

