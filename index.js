const db = require("./db");
const inquirer = require("inquirer");
const asciiartLogo = require("asciiart-logo");
const { quit } = require("./db");
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

const options = async () => {
    console.log("starting function");
    const { option } =  await inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'option',
            choices: ["VIEW_DEPARTMENTS", "VIEW_ROLES", "VIEW_EMPLOYEES", "ADD_DEPARTMENT", "ADD_ROLE", "ADD_EMPLOYEE", "UPDATE_EMPLOYEE_ROLE", "QUIT"],
        
        }
    ])

    return option;
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

function addDepartment() {
    inquirer.prompt([
        {
        type: "input",
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
const addRole =  async () => {
    const [ departments ] = await db.viewDepartment()

    const {title, salary, department_id} = await inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the role name',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Enter the salary',
            name: 'salary',
        },
        {
            type: 'list',
            message: 'Enter the department for this role',
            name: 'department_id',
            choices: departments.map(({id, department_name}) =>{
                return {
                    name: department_name,
                    value: id
                }
            }),
        }
    ])
    await db.addRole(title, salary, department_id);
    viewRoles();
}

const addEmployee = async() => {
    const [ roles ] = await db.viewRoles();
    const [employees] = await db.viewEmployees();
    const {first_name, last_name, role_id, manager_id} = await inquirer.prompt([
    {
        type: 'input',
        message: 'Enter the first name of the employee',
        name: 'first_name',
    },
    {
        type: 'input',
        message: 'Enter the last name of the employee',
        name: 'last_name',
    },
    {
        type: 'list',
        message: 'Enter the role',
        name: 'role_id',
        choices: roles.map(({Title, id}) =>{
            return {
                name:Title,
                value: id
            }
        }),
    },
    {
        type: 'list',
        message: 'Enter manager name',
        name: 'manager_id',
        choices: employees.map(({Employee_Name, id})=>{

            return {
                name: Employee_Name,
                value: id
            }
        }),
    }
])     
    console.log(first_name, last_name, role_id, manager_id);
    await db.addEmployee(first_name, last_name, role_id, manager_id);
    viewEmployees();
}

const updateEmployeeRole = async () =>{
    const [ roles ] = await db.viewRoles();
    const [employees] = await db.viewEmployees();
    const { employee_id, role_id } =  await inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee whould you like to update the role for?',
            name: 'employee_id',
            choices: employees.map(({Employee_Name, id})=>{
    
                return {
                    name: Employee_Name,
                    value: id
                }
            }),
        },
        {
            type: 'list',
            message: 'Enter the role',
            name: 'role_id',
            choices: roles.map(({Title, id}) =>{
                return {
                    name:Title,
                    value: id
                }
            }),
        }


    ])

    await db.updateEmployeeRole(employee_id, role_id);

    viewEmployees();

}


pre_init ();

