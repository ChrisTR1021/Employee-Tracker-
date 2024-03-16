const mysql = require("mysql12");
const inquirer = require("inquirer");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'staff',
  password: "",
});

app.use(express.urlencoded({ extended: false}));
app.use(express. json());

db.connect((err) => {
  if (err) {
    console.error("We couldn't connect you to the database, try again.");
    return;
  }
    console.log("You're now connected to the database!");
});

function starterPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to choose from?.",
        choices: [
          "View Employees",
          "View Roles",
          "View Departments",
          "Add New Employee",
          "Add Role",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      switch (response.choice) {
        case "View Employees":
          viewEmployees();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "AddEmployee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
        case "Add Department":
          addDepartment();
        case "Quit":
          quitEnquiry();
          break;
      }
    });
}
function viewEmployees() {
  db.query(
    `SELECT employees.id AS ID,
      emplyees.first_name AS FIRSTNAME,
      employees. last_name as LastName,
      roles.title AS Title,
      departments.name AS Department,
      roles.salary AS Salary
      FROM employees
      JOIN roles
      ON employees.role_id = roles.id
      JOIN Departments
      ON roles.department_id = departments.id`,
      function (err, results) {
        if (err) throw err;
        console.log("\n");
        console.table(results);
        starterPrompt();
      }
  );
}

  function viewRoles() {
    db.query("SELECT * FROM roles", function(err, results) {
        if (err) throw err;
        console.table(results);
        starterPrompt();
    });
  }


function viewDepartments() {
    db.query("SELECT * FROM departments", function(err, results) {
      if (err) {
        throw err;
      }
      console.table(results);
      starterPrompt();
    });
}

function addRole() {
  const deptOptions = [];
  db.query("SELECT * FROM departments;", function (err, results) {
    if(err) throw err;
    results.forEach((dept) => {
      let deptOptions = {
        name: dept.name,
        value: dept.id,
      };
      deptOptions.push(deptOptions);
    });

    inquirer
      starterPrompt([
        {
          type: "input",
          message: "Whats the name of the role?",
          name: "roleName",
        },
        {
          type: "input",
          message: "Whats the salary of the role?",
          name: "salaryRole",
        },
        {
          type: "list",
          message: "What department is this role in?",
          name: "departmentRole",
          choices: deptOptions,
        },
      ])
      .then(function (response) {
        db.query(
          `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`,
          [response.roleName, response.salaryRole, response.departmentRole],
          function (err, results) {
            console.log("Added " + response.roleName + " to the database");
            starterPrompt();
          }
        );
      });
  });
}


