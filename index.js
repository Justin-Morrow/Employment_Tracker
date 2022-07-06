const db = require("./db");
const inquirer = require("inquirer");
const asciiartLogo = require("asciiart-logo");
const { quit } = require("./db");
const { mapFinderOptions } = require("sequelize/types/utils");
require("console.table");

const init = async () => {
    const logo = asciiartLogo({name: "Employee Tracker"}).render();
    console.log(logo);
    options();
}


const options = async () => {
    console.log("starting function");
    const { option } =  await inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'option',
            choices: ["VIEW_DEPARTAMENTS", "VIEW_ROLES", "VIEW_EMPLOYEES", "ADD_DEPARTMENT", "ADD_ROLE", "ADD_EMPLOYEE", "UPDATE_EMPLOYEE_ROLE", "QUIT"],
            validate: (value) => { if (value) { return true; } else { return "Enter response to continue"; } },
        
        }
    ])
    
    callActions( option );
}