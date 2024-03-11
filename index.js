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