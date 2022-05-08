const { dbConn } = require('../server');

class Connection {
    constructor(db) {
        this.db = db;
    };

    getAllRoles = async () => {
        const query = 'SELECT roles.id AS ID, title AS Title, salary AS Salary, dept_name as Department FROM roles INNER JOIN departments on roles.department_id = departments.id;';
        const allDepartment = (await this.db).query(query);
        return allDepartment;
    };

    addRole = async ({ title, salary, department }) => {
        title = title.roleTitle;
        salary = salary.roleSalary;
        const dept_id = department.id;
        const query = (`INSERT INTO roles (title, salary, department_id) VALUES ('${title}', ${salary}, ${dept_id});`);
        const addDepartment = (await this.db).query(query);
        return addDepartment;
    };

    deleteRole = async (id) => {
        console.log(id)
        const query = (`DELETE FROM roles WHERE id = ${id};`);
        const deleteDepartment = (await this.db).query(query);
        return deleteDepartment;
    };
}
module.exports = new Connection(dbConn());