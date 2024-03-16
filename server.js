const mysql = require("mysql12");
const inquirer = require("inquirer");
const express = require("express");


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'staff',
  password: "",
  });
   

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
          Quit();
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


function addEmployee() {
  const listedPosition = ["1", "2", "3", "4"];
  inquirer
  .prompt([
    {
      name: "first_name",
      type: "input",
      messgae: "Whats the first name",
    },
    {
      name: "last_name",
      type: "input",
      message: "Whats the last name",
    },
    {
      name: "role_id",
      type: "list",
      message: "whats the the role of the employee",
      choices: listedPosition
    },
  ])
  then((data) => {
    const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
 VALUES (?, ?, ?, ?);`;
    db.query(
      query,
      [data.first_name, data.last_name, data.role_id, data.manager_id],
      function (err, results) {
        if (err) throw err;
        console.table(results);
        initialPrompt();
      }
    );
  });
}

