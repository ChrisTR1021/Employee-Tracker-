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
          addRoles();
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

//Pulls all roles
function viewRoles() {
db.query("SELECT * FROM roles", function(err, results) {
    if (err) throw err;
    console.table(results);
    starterPrompt();
});
}
function viewEmployees() {
    db.query(
        `SELECT employees.id,
        employees.first_name,
        employees.last_name,
        roles.title,
        departments.name,
        roles.salary,
        concat(manager.first_name, " ", manager.last_name)
                  AS manager FROM employees
                  LEFT JOIN roles ON employees.role_id=roles.id
                  LEFT JOIN departments ON roles.department_id=departments.id
LEFT JOIN employees manager ON manager.id=employees.manager_id`,
        function (err, results) {
            if(err) throw err;
            console.table(results);
            starterPrompt
        });
}

// new department creation
function addDepartment() {
    inquirer
    .prompt({
       type: "input",
       message: "what is the name of the department?",
       name: "departmentName", 
    })
    .then(function(response) {
      db.query(
        "INSERT INTO departments (id, name) Values (?);",
        [response.departmentName],
        function (err, results) {
            if(err) throw err;
            console.log("Added " + response.departmentName + "to the database");
            starterPrompt();
        }
        );
     });
}
function addRoles() {
    const departmentOption = [];
  
    //This gets all of the departments from the database and populates and array with the values and IDs 
    //This array is later used for the choices in the list that is prompted to the user
    db.query("SELECT * FROM departments;", function (err, results) {
      if(err) throw err;
      results.forEach((department) => {
        let departmentPost = {
          name: department.name,
          value: department.id,
        };
        departmentOption.push(departmentOption);
      });
  
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the new role?",
            name: "roleTitle",
          },
          {
            type: "input",
            message: "Whats the salary of the new role?",
            name: "salary",
          },
          {
            type: "list",
            message: "Which department does the role belong to?",
            name: "department",
            choices: departmentOption,
          },
        ])
        .then(function (response) {
          db.query(
            `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`,
            [response.roleTitle, response.salary, response.department],
            function (err, results) {
              console.log("Added " + response.roleTitle + " to the database");
              starterPrompt();
            }
          );
        });
    });
  }
  function addEmployee() {

  inquirer
  .prompt([
    {
      type: "input",
      message: "Whats the employees first name?",
      name: "firstName",
    },
    {
      type: "input",
      message: "Whats the employees last name?",
      name: "lastName",
    },
  ])
  .then(function (response) {
    db.query(
      "INSERT INTO employees (first_name, last_name,) VALUES (?, ?,);",
      [
        response.firstName,
        response.lastName,
      ],
      function (err, results) {
        if(err) throw err;
        console.log("Added " + response.firstName + " " + response.lastName + " to the database");
        starterPrompt();
      }
    );
  });
  }


        
    

