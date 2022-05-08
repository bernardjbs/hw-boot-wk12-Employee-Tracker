const promptInput = require('./src/promptInput');
const consoleTable = require("console.table");
const tynt = require('tynt');
const { getAllDepartments, addDepartment, deleteDepartment, updateDepartment, getDepartmentIDByName } = require('./db/queries/department');
const { getAllRoles, addRole, deleteRole } = require('./db/queries/roles');
const { validation } = require('./src/inputValidation');

// Prompts for departments
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

// Prompts for roles
const viewAllRoles = async() => {
    const [allRoles] = await getAllRoles();
    console.log('\n');
    console.log(consoleTable.getTable(allRoles));
    init();
};

const addRolePrompt = async() => {
    const role ={};
    const promptMessage_title = 'Please enter the title for the role:';
    const promptMessage_salary = 'Please enter the salary for the role:';
    const promptMessage_dept = 'Please choose the department from the list';
    const [allDept] = await getAllDepartments();
    deptNames = allDept.map((allDept)=> allDept.Department);
    
    const roleTitle = await promptInput('roleTitle', 'input', promptMessage_title, [], (input) => validation(input, '', 'NOT_NULL'));
    const roleSalary = await promptInput('roleSalary', 'input', promptMessage_salary, [], (input) => validation(input, 'INT', 'NOT_NULL'));
    const roleDept = await promptInput('deptName', 'list', promptMessage_dept, deptNames);

    const [dept] = await getDepartmentIDByName(roleDept);

    role.title = roleTitle;
    role.salary = roleSalary;
    [role.department] = dept;
    await addRole(role);
    init();
};

const deleteRolePrompt = async() => {
    const promptMessage = 'Please enter the role id you wish to delete:';
    const { roleID } = await promptInput('roleID', 'input', promptMessage, [], (input) => validation(input, 'INT', 'NOT_NULL'));
    await deleteRole(roleID);
    init();
};

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
        'Delete Role',
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
        case 'View All Roles': {
            viewAllRoles();
            break;
        }
        case 'Add Role': {
            addRolePrompt();
            break;
        }
        case 'Delete Role': {
            deleteRolePrompt();
            break;
        }
    default: 
        return console.log("Make a choice")
    };
};

init();
