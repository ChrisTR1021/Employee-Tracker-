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
