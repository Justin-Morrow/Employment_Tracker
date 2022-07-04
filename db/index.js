const { connect } = require("./connect-to-database");
const connection = require("./connect-to-database");

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    
    viewDepartment () {
        return this.connection.promise().query(
        `SELECT * FROM department`
        )
    }

    viewRoles() {
        return this.connection.promise().query(
        `SELECT role.id, role.title as Title, role.salary as Salary, department.department_name as Department FROM role
        LEFT JOIN department 
        ON role.department_id = department.id `
        )

    }

    viewEmployees() {
        return this.connection.promise().query(
            `SELECT em.id, concat(em.first_name," ", em.last_name) as Employee_Name, r.title as Title, r.salary as Salary, d.department_name as Department, concat(e.first_name," ", e.last_name) as Manager_Name
            FROM employee em
            LEFT JOIN role r
            ON em.role_id = r.id
            LEFT JOIN department d
            ON r.department_id = d.id
            LEFT JOIN employee e
            ON em.manager_id = e.id
            ORDER BY em.id
            `
        )
    }

    addDepartment(department_name) {
        return this.connection.promise().query(
            `INSERT INTO department SET ? `, {department_name}
        )
    }

    addRole (title, salary, department_id) {
        return this.connection.promise().query(
            `INSERT INTO role SET ? `, {title, salary, department_id}
        )
    }

    addEmployee (first_name, last_name, role_id, manager_id) {
        return this.connection.promise().query (
            `INSERT INTO role SET ? `, {first_name, last_name, role_id, manager_id}
        )
    }

    updateEmployeeRole(id, role_id) {
        return this.connection.promise().query(
            `UPDATE employee set ? WHERE ? `, [{role_id}, {id}]
        )
    }

    quit(){
        connection.end();
    }
}

module.exports = new DB(connection);