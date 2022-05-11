const { dbConn } = require('../server');

class Connection {
    constructor(db) {
        this.db = db;
    };

    getAllRoles = async() => {
        const query = 'SELECT roles.id AS ID, title AS Title, salary AS Salary, dept_name as Department FROM roles INNER JOIN departments on roles.department_id = departments.id;';
        const allRole = (await this.db).query(query);
        return allRole;
    };

    addRole = async({ title, salary, department }) => {
        title = title.roleTitle;
        salary = salary.roleSalary;
        const dept_id = department.id;
        const query = (`INSERT INTO roles (title, salary, department_id) VALUES ('${title}', ${salary}, ${dept_id});`);
        const addRole = (await this.db).query(query);
        return addRole;
    };

    deleteRole = async(id) => {
        const query = (`DELETE FROM roles WHERE id = ${id};`);
        const deleteRole = (await this.db).query(query);
        return deleteRole;
    };

    getRoleIDbyTitle = async({ role_title }) => {
        console.log(role_title);
        const query = (`SELECT id FROM roles WHERE title LIKE '${role_title}';`);
        const getRoleIDbyTitle = (await this.db).query(query);
        return getRoleIDbyTitle;
    }
}
module.exports = new Connection(dbConn());