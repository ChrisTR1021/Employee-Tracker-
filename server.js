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
