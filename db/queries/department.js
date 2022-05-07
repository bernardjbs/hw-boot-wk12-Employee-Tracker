const { dbConn }  = require('../server');

class Connection {
    constructor(db) {
        this.db = db;
    }

    getAllDepartments = async() => {
        const query = "SELECT * FROM departments";
        const allDept = (await this.db).query(query);
        return (await this.db).query(query);
    } 
}
module.exports = new Connection(dbConn());


//--------------------------------------
// async function getAllDepartments() {
//     const db = dbConn();
//     const query = "SELECT * FROM departments";
//     return (await db).query(query);
// };

// module.exports = { getAllDepartments };
//--------------------------------------


