const promptInput = require('./src/promptInput');
const consoleTable = require("console.table");
const tynt = require('tynt');
const deptSQL = require('./db/queries/department');
const roleSQL = require('./db/queries/roles');
const empSQL = require('./db/queries/employees');
const { validation } = require('./src/inputValidation');

// Prompts for departments
const viewAllDepartments = async() => {
    const [allDept] = await deptSQL.getAllDepartments();
    console.log('\n');
    console.log(consoleTable.getTable(allDept));
    init();
};

const addDeptPrompt = async() => {
    const promptMessage = 'Please enter the department name you want to add:';
    const { deptName } = await promptInput('deptName', 'input', promptMessage, [], (input) => validation(input, '', 'NOT_NULL'));
    await deptSQL.addDepartment(deptName);
    init();
};

const delDeptPrompt = async() => {
    const promptMessage = 'Please enter the department ID you want to delete:';
    const { deptID } = await promptInput('deptID', 'input', promptMessage, [], (input) => validation(input, 'INT', 'NOT_NULL'));
    await deptSQL.deleteDepartment(deptID);
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
    await deptSQL.updateDepartment(department);
    init();
}

// Prompts for roles
const viewAllRoles = async() => {
    const [allRoles] = await roleSQL.getAllRoles();
    console.log('\n');
    console.log(consoleTable.getTable(allRoles));
    init();
};

const addRolePrompt = async() => {
    const role ={};
    const promptMessage_title = 'Please enter the title for the role:';
    const promptMessage_salary = 'Please enter the salary for the role:';
    const promptMessage_dept = 'Please choose the department from the list';
    const [allDept] = await deptSQL.getAllDepartments();
    deptNames = allDept.map((allDept)=> allDept.Department);
    
    const roleTitle = await promptInput('roleTitle', 'input', promptMessage_title, [], (input) => validation(input, '', 'NOT_NULL'));
    const roleSalary = await promptInput('roleSalary', 'input', promptMessage_salary, [], (input) => validation(input, 'INT', 'NOT_NULL'));
    const roleDept = await promptInput('deptName', 'list', promptMessage_dept, deptNames);

    const [[dept]] = await deptSQL.getDepartmentIDByName(roleDept);

    role.title = roleTitle;
    role.salary = roleSalary;
    role.department = dept;
    await roleSQL.addRole(role);
    init();
};

const deleteRolePrompt = async() => {
    const promptMessage = 'Please enter the role id you wish to delete:';
    const { roleID } = await promptInput('roleID', 'input', promptMessage, [], (input) => validation(input, 'INT', 'NOT_NULL'));
    await roleSQL.deleteRole(roleID);
    init();
};

// Prompt for Employees
const viewAllEmployees = async() => {
    const [allEmp] = await empSQL.getAllEmployees();
    console.log('\n');
    console.log(consoleTable.getTable(allEmp));
    init();
};

const addEmployee = async() => {
    const promptMessage_first_name = `Please enter Employee's first name:`;
    const promptMessage_last_name = `Please enter Employee's last name`;
    const prompotMessage_role = `Please select Employee's role:`;
    const prompotMessage_manager = `Please select Employee's manager:`;
    const [roles] = await roleSQL.getAllRoles();
    const roleTitles = await roles.map((roles => roles.Title));

    const [employees] = await empSQL.getAllEmployees();

    const managers = employees.map((employees => employees.Employee));
    const { first_name } = await promptInput('first_name', 'input', promptMessage_first_name, [], (input) => validation(input, '', 'NOT_NULL'));
    const { last_name } = await promptInput('last_name', 'input', promptMessage_last_name, [], (input) => validation(input, '', 'NOT_NULL'));
    const role_title = await promptInput('role_title', 'list', prompotMessage_role, roleTitles);
    const [[role]] = await roleSQL.getRoleIDbyTitle(role_title);
    const { manager_name } = await promptInput('manager_name', 'list', prompotMessage_manager, managers);
    const [[manager]] = await empSQL.getEmployeeIDbyFullName(manager_name);
    
    await empSQL.addEmployee(first_name, last_name, role.id, manager.id);
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
        'View All Employees',
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
        case 'View All Employees': {
            viewAllEmployees();
            break;
        }
        case 'Add Employee': {
            addEmployee();
            break;
        }
    default: 
        return console.log("Make a choice")
    };
};

init();
