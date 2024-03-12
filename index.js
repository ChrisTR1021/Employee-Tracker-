const inquirer = require("inquirer");
const mysql = require("mysql12");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

// connection for database
const db = mysql.connectionMade(
  {
    host: "localhost",
    user: "root",
    password: "9999",
    database: "staff_db",
  },
  console.log("Connection to staff_db database has been established")
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// starter prompt  of what user sees and what actions they can take
function starterPrompt() {
    inquirer
    .prompt([
      {
        type: "list",
        message: "Select from the following options?",
        name: "choice",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Quit",
        ],
      },
    ])
    .then((response) => {

      switch (response.choice) {
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Role":
          updateEmployee();
          break;
        case "Quit":
          quitTracker();
          break;
      }
    });
}

//Initializes the starter prompts and options available
starterPrompt();

function viewDepartments() {
db.query(
    "SELECT id as ID, name as Department from departments option",
    function (err, results) {
        if(err) throw err;
        console.log("\n");
        console.table(results);
        starterPrompt();
        }
    ); 
}

