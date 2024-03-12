const inquirer = require("inquirer");
const mysql = require("mysql12");
const express = require("express");

const app = express();
const PORT = process.env.Port || 3001;

// connection for database
const db = mysql.connectionMade(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "staff_db",
  },
  console.log("Connection to staff_db database has been established")
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please select from the following options:",
        name: "initialize",
        choices: [
          "View all departments",
          "View all roles",
          "View all employess",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employyee role",
          "Exit ",
        ],
      },
    ])
    .then((ans) => {
      //ans. initialize
      switch (ans.initialize) {
        case "View all departments":
          viewDepartment();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRoles();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployee();
          break;
        case "Exit":
          console.log("Thank you very much!");
          process.exit();
      }
    })
    .catch((err) => console.error(err));
};

init();

const viewDepartment = () => {
  db.query(`SELECT * FROM department`, (err, results) => {
    err ? console.error(err) : console.table(results);
    init();
  });
};

const viewRoles = () => {
  db.query(`SELECT * FROM department`, (err, results) => {
    err ? console.error(err) : console.table(results);
    init();
  });
};

const viewEmployees = () => {
  db.query(`SELECT * FROM department`, (err, results) => {
    err ? console.error(err) : console.table(results);
    init();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Whats the name of the department you wish to add?",
        name: "addDepartment",
      },
    ])
    .then((ans) => {
      db.query(
        `INSERT INTO department(name)
                    VALUES(?)`,
        ans.addDepartment,
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            db.query(`SELECT * FROM department`, (err, results) => {
              err ? console.error(err) : console.table(results);
              init();
            });
          }
        }
      );
    });
};

const addRoles = () => {
  const deptChoices = () =>
    db
      .promise()
      .query(`SELECT * FROM department`)
      .then((rows) => {
        let newNames = rows[0].map((obj) => obj.name);
        return newNames;
      });
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the title of the role you'd like to add?",
        name: "roleTitle",
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salary",
      },
      {
        type: "list",
        message: "Which department is this role in?",
        name: "department",
        choices: deptChoices,
      },
    ])
    .then((ans) => {
      db.promise()
        .query(`SELECT id FROM department WHERE name = ?`, ans.addDept)
        .then((answer) => {
          let mappedId = answer[0].map((obj) => obj.id);
          // console.log(mappedId[0])
          return mappedId[0];
        })
        .then((mappedId) => {
          db.promise().query(
            `INSERT INTO roles(title, salary, department_id)
                VALUES(?, ?, ?)`,
            [ans.roleTitle, ans.salary, mappedId]
          );
          init();
        });
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Whats the employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "Whats the employee's last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "employeeRole",
        choices: roleChoices,
      },
    ])
    .then((ans) => {
      db.query(
        `INSERT INTO employees(first_name, last_name)
                    VALUES(?, ?)`,
        [ans.firstName, ans.lastName],
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            db.query(`SELECT * FROM employees`, (err, results) => {
              err ? console.error(err) : console.table(results);
              init();
            });

