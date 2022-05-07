const promptInput = require('./src/promptInput');
const consoleTable = require("console.table");
const { getAllDepartments } = require('./db/queries/department');
const db = require('./db/server');

const viewAllDepartments = async() => {
    const [allDept] = await getAllDepartments();
    console.log(consoleTable.getTable(allDept));
}
const init = async () => {
    const menuArr = [
        'Add Employee', 
        'Update Employee Role', 
        'View All Roles', 
        'Add Role', 
        'View All Departments', 
        'Add Department', 
        'Quit'
    ];
    const startMenu = await promptInput('choice', 'list', 'What would you like to do?', menuArr);
    if(startMenu.choice === "View All Departments") {
        console.log("We view all departments");
        viewAllDepartments();
    }
}


init();
