const { dbConn } = require('../server');

class Connection {
    constructor(db) {
        this.db = db;
    };

    getAllDepartments = async () => {
        const query = 'SELECT id AS ID, dept_name AS Department_Name FROM departments';
        const allDepartment = (await this.db).query(query);
        return allDepartment;
    };

    addDepartment = async (department) => {
        const query = (`INSERT INTO departments (dept_name) VALUES('${department}');`);
        const addDepartment = (await this.db).query(query);
        return addDepartment;
    };

    deleteDepartment = async (id) => {
        const query = (`DELETE FROM departments WHERE id = ${id};`)
        const deleteDepartment = (await this.db).query(query);
        return deleteDepartment;
    };

    updateDepartment = async ({id, name}) => {
        // const deptID = department.id;
        // const deptName = department.name;
        const query =(`UPDATE departments SET dept_name = '${name}' WHERE id=${id};`);
        const updateDepartment = (await this.db).query(query);
        return updateDepartment;
    };
}
module.exports = new Connection(dbConn());


