const inquirer = require("inquirer");
const router = express.Router();
const express = require("express");
const db = require("./db/connection");
const { connection } = require("./db");
const mysql = require("mysql");
const { exit } = require("process");

db.connect(async function () {
  starterPrompt();
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
    .then((answer) => {
      switch (answer.choice) {
        case "View Employees":
          viewEmployees();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "Add New Employee":
          newEmployee();
          break;
        case "Add Role":
          addRole();
        case "Add Department":
          addDepartment();
        case "exit":
          exit();
          break;
      }
    });
}
function viewEmployees() {
  const summon = "SELECT * FROM employees";
  db.query(summon, function(err, res) {
    if (err) throw err;
    console.log("Viewing All Employees");
    console.table(res);
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'select an option.',
            choices: [
                'Main Menu',
                'Quit'
            ],
        }
      ])
    })
  }
  then((answer) => {
    switch (answer.choices) {
        case 'Main Menu':
            start();
          break;
          case 'Quit':
              Quit();
    }
})
  starterPrompt();

