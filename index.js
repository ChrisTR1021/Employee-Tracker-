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
        ])
}