const promptInput = require('./src/promptInput');
const consoleTable = require("console.table");
const tynt = require('tynt');
const { getAllDepartments, addDepartment, deleteDepartment, updateDepartment } = require('./db/queries/department');
const { validation } = require('./src/inputValidation');

const viewAllDepartments = async() => {
    const [allDept] = await getAllDepartments();
    console.log('\n');
    console.log(consoleTable.getTable(allDept));
    init();
};

const addDeptPrompt = async() => {
    const promptMessage = 'Please enter the department name you want to add:';
    const { deptName } = await promptInput('deptName', 'input', promptMessage, [], (input) => validation(input, '', 'NOT_NULL'));
    await addDepartment(deptName);
    init();
};

const delDeptPrompt = async() => {
    const promptMessage = 'Please enter the department ID you want to delete:';
    const { deptID } = await promptInput('deptID', 'input', promptMessage, [], (input) => validation(input, 'INT', 'NOT_NULL'));
    await deleteDepartment(deptID);
    init();
}

const updateDeptPrompt = async() => {
    const department = {};
    const prompotMessage_id = 'Please enter the department ID you want to update:';
    const promptMessage_name = 'Please enter the department name to be updated:';
    const { deptID } = await promptInput('deptID', 'input', prompotMessage_id, [], (input) => validation(input, 'INT', 'NOT_NULL'));
    const { deptName } = await promptInput('deptName', 'input', promptMessage_name, [], (input) => validation(input, '', 'NOT_NULL'));
    department.id = deptID;
    department.name = deptName;
    await updateDepartment(department);
    init();
}

const init = async () => {
    console.log(tynt.Blue('----------------------------------------------'));
    const menuArr = [
        'Add Employee', 
        'Update Employee Role', 
        'View All Roles', 
        'Add Role', 
        'View All Departments', 
        'Add Department', 
        'Delete Department',
        'Update Department',
        'Quit'
    ];
    const startMenu = await promptInput('choice', 'list', 'What would you like to do?', menuArr);
    switch(startMenu.choice) {
        case "View All Departments": {
            viewAllDepartments();
            break;
        }
        case "Add Department": {
            addDeptPrompt();
            break;
        }
        case "Delete Department": {
            delDeptPrompt();
            break;
        }
        case "Update Department": {
            updateDeptPrompt();
            break;
        }
    default: 
        return console.log("Make a choice")
    };
};

init();
