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

const addEmployeePrompt = async() => {
    const promptMessage_first_name = `Please enter Employee's first name:`;
    const promptMessage_last_name = `Please enter Employee's last name`;
    const promptMessage_role = `Please select Employee's role:`;
    const promptMessage_manager = `Please select Employee's manager:`;

    const { first_name } = await promptInput('first_name', 'input', promptMessage_first_name, [], (input) => validation(input, '', 'NOT_NULL'));
    const { last_name } = await promptInput('last_name', 'input', promptMessage_last_name, [], (input) => validation(input, '', 'NOT_NULL'));

    const role = await promptRoleTitles(promptMessage_role);
    const manager = await promptEmployeeFullName(promptMessage_manager);
    
    const values = [first_name, last_name, role.id, manager.id]
  
    await empSQL.addEmployee(values);
  
    init();
};

const updateEmpRolePrompt = async() => {
    const emp = await promptEmployeeFullName('Please choose the Employee whose role you wish to change:'); 
    const role = await promptRoleTitles('Please choose the role you want to change for employee:')
    const values = [role.id, emp.id]
    await empSQL.updateEmpRole(values);
    init();
};

const deleteEmployeePrompt = async() => {
    const message = 'Please choose the Employee whose role you wish to delete:';
    const emp = await promptEmployeeFullName(message);
    await empSQL.deleteEmployee(emp.id);
    init();
};


// Helper prompt codes
const promptRoleTitles = async(message) => {
    const [roleTitles] = await roleSQL.getRoleTitles();
    const titles = roleTitles.map((roleTitles => roleTitles.title));
    const {role_title} = await promptInput('role_title', 'list', message, titles);
    const [[role]] = await roleSQL.getRoleIDbyTitle(role_title);
    return role;
};

const promptEmployeeFullName = async(message) => {
    const [employees] = await empSQL.getEmployeeFullName();
    const emp_fullNames = employees.map((employees => employees.Employee));
    const {empFullName} = await promptInput('empFullName', 'list', message, emp_fullNames);
    const [[emp]] = await empSQL.getEmployeeIDbyFullName(empFullName);
    return emp;
}

const init = async () => {
    console.log(tynt.Blue('----------------------------------------------'));
    const menuArr = [
        'Add Employee', 
        'Delete Employee',
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
            addEmployeePrompt();
            break;
        }
        case 'Update Employee Role': {
            updateEmpRolePrompt();
            break;
        }
        case 'Delete Employee': {
            deleteEmployeePrompt();
            break;
        }
    default: 
        return console.log("Make a choice")
    };
};

init();
