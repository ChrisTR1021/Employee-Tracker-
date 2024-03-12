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
    console.log('Connection to staff_db database has been established')
);

app.use(express.urlencoded({ extended:false }));
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
                    "Exit "
                ]
            }
        ]).then(ans => {
            //ans. initialize
        switch (ans.initialize) {
            case "View all departments": viewDepartment();
                break;
            case "View all roles": viewRoles();
                break;
            case "View all employees": viewEmployees();
                break;
            case "Add a department": addDepartment();
                break;
            case "Add a role": addRoles();
                break;
            case "Add an employee": addEmployee();
                break;
            case "Update an employee role": updateEmployee();
                break;
            case "Exit":
                console.log("Thank you very much!");
                process.exit();
        }
    }).catch(err => console.error(err));

    }

    init();

    const viewDepartment = () => {
        db.query(`SELECT * FROM department`, (err, results) => {
            err? console.error(err) : console.table(results);
            init();
        })
    };

    
        }
            )
}