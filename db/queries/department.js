const { dbConn } = require('../server');

class Connection {
    constructor(db) {
        this.db = db;
    };

    getAllDepartments = async() => {
        const query = `SELECT id AS ID, dept_name AS Department FROM departments`;
        const allDepartment = (await this.db).query(query);
        return allDepartment;
    };

    addDepartment = async(department) => {
        const query = (`INSERT INTO departments (dept_name) VALUES(?);`);
        const addDepartment = (await this.db).query(query, department);
        return addDepartment;
    };

    deleteDepartment = async (id) => {
        const query = (`DELETE FROM departments WHERE id = ?;`);
        const deleteDepartment = (await this.db).query(query, id);
        return deleteDepartment;
    };

    updateDepartment = async (department) => {
        const query = (`UPDATE departments SET dept_name = ? WHERE id= ?;`);
        const updateDepartment = (await this.db).query(query, department);
        return updateDepartment;
    };

    getDepartmentIDByName = async(deptName) => {
        const query = (`SELECT id FROM departments WHERE dept_name LIKE ?;`);
        const getDepartmentIDByName = (await this.db).query(query, deptName);
        return getDepartmentIDByName;
    }

    getDepartmentNames = async() => {
        const query = 'SELECT dept_name AS name FROM departments;';
        const getDepartmentNames = (await this.db).query(query);
        return getDepartmentNames;
    }

    getDeptBudget = async(department_id) => {
        const query = `SELECT SUM(salary) AS 'Salary Budget', dept_name as Department FROM 
        employees JOIN roles ON employees.role_id = roles.id JOIN departments ON departments.id = roles.department_id AND departments.id = ?;`
        const getDeptBudget = (await this.db).query(query, department_id);
        return getDeptBudget;
    }
}
module.exports = new Connection(dbConn());


