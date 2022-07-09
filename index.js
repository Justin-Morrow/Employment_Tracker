const db = require("./db");
const inquirer = require("inquirer");
const asciiartLogo = require("asciiart-logo");
const { quit } = require("./db");
// const { mapFinderOptions } = require("sequelize/types/utils");
require("console.table");
let userOption; 
function pre_init(){
    const logo = asciiartLogo({name: "Employee Tracker"}).render();
    console.log(logo);
    init();
}

const init = async () => {
    
    options().then(answers =>{
        console.log("answers", answers);
        console.log("answers.option=", answers.option);
        callActions( answers );
    });
    
}
// function options () {
//     console.log("starting function");
//     const { option } =  await inquirer.prompt([
//         {
//             type: 'list',
//             message: 'What would you like to do?',
//             name: 'option',
//             choices: ["VIEW_DEPARTMENTS", "VIEW_ROLES", "VIEW_EMPLOYEES", "ADD_DEPARTMENT", "ADD_ROLE", "ADD_EMPLOYEE", "UPDATE_EMPLOYEE_ROLE", "QUIT"],
//             validate: (value) => { if (value) { return true; } else { return "Enter response to continue"; } },
        
//         }
//     ])
//     // userOption = option;
//     return option;
//     // callActions( option );
// }
const options = async () => {
    console.log("starting function");
    const { option } =  await inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'option',
            choices: ["VIEW_DEPARTMENTS", "VIEW_ROLES", "VIEW_EMPLOYEES", "ADD_DEPARTMENT", "ADD_ROLE", "ADD_EMPLOYEE", "UPDATE_EMPLOYEE_ROLE", "QUIT"],
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
        case "VIEW_DEPARTMENTS":
            db.viewDepartment()
            .then(([rows])=>{
                let allDepartments = rows;
                console.log("\n");
                console.table(allDepartments);
            }).
            then(()=>init());
            break;
        case "VIEW_ROLES":
            db.viewRoles()
            .then(([rows])=>{
                let allRoles = rows;
                console.log("\n");
                console.table(allRoles);
            }).
            then(()=>init());
            break;
        case "VIEW_EMPLOYEES":
            db.viewEmployees()
            .then(([rows])=>{
                let allEmployees = rows;
                console.log("\n");
                console.table(allEmployees);
            }).
            then(()=>init());
            break;
        case "ADD_DEPARTMENT":
            addDepartment();
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
function addDepartment () {
    inquirer.prompt([
        {
          name: "name",
          message: "What is the name of the department?"
        }
      ]).then(answer => {
        console.log("answer", answer);
        let name = answer;
        db.addDepartment(name)
        .then(()=> console.log(`added ${name.name} to db`))
        .then(()=> init())
      })
}
pre_init ();