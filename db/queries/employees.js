const { dbConn } = require('../server');

class Connection {
    constructor(db) {
        this.db = db
    };

    getAllEmployees = async () => {
        const query = `
        SELECT employees.id as ID, 
        CONCAT(employees.first_name, ' ', employees.last_name) AS Employee, 
        title AS Title, 
        salary AS Salary, 
        dept_name AS Department, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS Manager 
        FROM employees 
        INNER JOIN roles 
        ON employees.role_id = roles.id 
        INNER JOIN departments 
        ON roles.department_id = departments.id 
        LEFT JOIN employees manager 
        ON manager.id = employees.manager_id
        ORDER BY id;`
        const allEmployees = (await this.db).query(query);
        return allEmployees
    };

    getEmployeeIDbyFullName = async(fullName) => {
        const splitName = fullName.split(" ");
        const query = `SELECT id FROM employees WHERE first_name = '${splitName[0]}' AND last_name = '${splitName[1]}';`;
        const getEmployeeIDbyFullName = (await this.db).query(query);
        return getEmployeeIDbyFullName;
    }

    addEmployee = async(first_name, last_name, role_id, manager_id) => {
        const query = (`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES('${first_name}', '${last_name}', ${role_id}, ${manager_id});`);
        // const query = `SELECT * FROM employees;`;
        const addEmployee = (await this.db).query(query);
        return addEmployee;
    }
}

module.exports = new Connection(dbConn());

