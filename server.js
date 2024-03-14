const inquirer = require("inquirer");
const router = express.router("./index.js");
const express = require("express");
const db = require("./connection");
const { connection } = require("./db");
const mysql = require("");
const { quit } = require("process");


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'staff',
  password: "",
  });
   
  module.exports = connection;

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
        case "Quit":
          Quit();
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
                'Menu',
                'Quit'
            ],
        }
      ])
    })
  }
  then((answer) => {
    switch (answer.choices) {
        case 'Menu':
            start();
          break;
          case 'Quit':
              quituit();
    }
})
  starterPrompt();

  function viewRoles() {
    let summon = "SELECT * FROM roles";
    db.query(summon, function(err, res) {
        if (err) throw err;
        console.log("Viewing All Roles");
        console.table(res);
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'select an option.',
                choices: [
                    'Menu',
                    'Quit'
                ]
            }
        ])
      })
    }
    then((answer)=>{
      switch (answer.choices) {
          case 'Menu':
              start();
              break;
          case 'Quit':
          quit();
      }
  })

  function viewDepartments() {
    const summon = "SELECT * FROM department";
    db.query(summon, function(err, res) {
        if (err) throw err;
        console.log("Viewing All Departments");
        console.table(res);
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'select an option.',
                choices: [
                    'Menu',
                    'Quit'
                ]
            }
        ])
       .then((answer) => {
           switch (answer.choices){
               case 'Menu':
                   start();
                   break;
                   case 'Quit':
                       quit();
           }
       })
    })
}
function newEmployee() {
  console.log('Hello! How are you?')
  inquirer.prompt ([
      {
      type: 'input',
      message: 'Enter employee first name.',
      name: 'firstName'
      },
      {
          type: 'input',
          message: 'Enter employee last name.',
          name: 'lastName'
      },
      {
          type: 'input',
          message: 'Enter employee ID number',
          name: 'employeeID'
      },
      {
          type: 'input',
          message: 'Enter thier managers ID',
          name: 'managerID'
      }
      
  ])
}
then(function (response) {
  connection.query('INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)', 
  [response.FirstName, response.LastName, response.EmployeeID, response.ManagerID]), function(err,response) {
      if (err) throw err;
      console.table(res);
      inquirer.prompt([
          {
              type: 'list',
              name: 'choice',
              message: 'select an option.',
              choices: [
                  'Menu',
                  'Quit'
              ]
          }
      ])
     .then((answer) => {
         switch (answer.choices){
             case 'Menu':
                 start();
                 break;
                 case 'Quit':
                     quit();
         }
     })
  }
})

function quit() {
  console.log('Until Next Time');
  process.exit();
  
}

viewEmployees();
