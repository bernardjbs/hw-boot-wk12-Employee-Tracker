const { dbConn } = require('../server');

class Connection {
    constructor(db) {
        this.db = db;
    };
    // METHODS TO RETURN QUERY RESULTS FOR ROLES TABLE
    getAllRoles = async() => {
        const query = 'SELECT roles.id AS ID, title AS Title, salary AS Salary, dept_name as Department FROM roles INNER JOIN departments on roles.department_id = departments.id ORDER BY id;';
        const allRole = (await this.db).query(query);
        return allRole;
    };

    addRole = async(role) => {
        const query = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`;
        const addRole = (await this.db).query(query, role);
        return addRole;
    };

    deleteRole = async(id) => {
        const query = (`DELETE FROM roles WHERE id = ?;`);
        const deleteRole = (await this.db).query(query, id);
        return deleteRole;
    };

    getRoleIDbyTitle = async(role_title) => {
        const query = (`SELECT id FROM roles WHERE title LIKE ?;`);
        const getRoleIDbyTitle = (await this.db).query(query, role_title);
        return getRoleIDbyTitle;
    }

    getRoleTitles = async() => {
        const query = 'SELECT title FROM roles';
        const getRoleTitles = (await this.db).query(query);
        return getRoleTitles;
    }
}
module.exports = new Connection(dbConn());