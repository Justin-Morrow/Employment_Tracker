const db = require("./db");
const inquirer = require("inquirer");
const asciiartLogo = require("asciiart-logo");
const { quit } = require("./db");
// const { mapFinderOptions } = require("sequelize/types/utils");
require("console.table");
let userOption; 

const init = async () => {
    const logo = asciiartLogo({name: "Employee Tracker"}).render();
    console.log(logo);
    options.then(answers =>{
    userOption = answers.option;    
    });
    callActions( userOption );
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
    // userOption = option;
    return option;
    // callActions( option );
}

const callActions = ( option ) => {
    console.log("I am in callActions")
    console.log("Option=", option);
    switch(option){
        case "VIEW_DEPARTAMENTS":
            viewDepartament();
            break;
        case "VIEW_ROLES":
            viewRoles();
            break;
        case "VIEW_EMPLOYEES":
            viewEmployees();
            break;
        case "ADD_DEPARTMENT":
            addDepartament();
            break;
        case "ADD_ROLE":
            addRole();
            break;
        case "ADD_EMPLOYEE":
            addEmployee();
            break;    
        case "UPDATE_EMPLOYEE_ROLE":
            updateEmployeeRole();
            break;
        case "QUIT":
            db.quit();
            break;                                    
    }
}

init ();