const promptInput = require('./src/promptInput');
const consoleTable = require("console.table");
const colors = require('colors');
const deptSQL = require('./db/queries/department');
const roleSQL = require('./db/queries/roles');
const empSQL = require('./db/queries/employees');
const { validation } = require('./src/inputValidation');

// VIEW ALL DEPARTMENTS
const viewAllDepartments = async () => {
    const [allDept] = await deptSQL.getAllDepartments();
    console.log('\n');
    console.log(consoleTable.getTable(allDept).green);
    init();
};

// VIEW ALL ROLES
const viewAllRoles = async () => {
    const [allRoles] = await roleSQL.getAllRoles();
    console.log('\n');
    console.log(consoleTable.getTable(allRoles).green);
    init();
};

// VIEW ALL EMPLOYEES
const viewAllEmployees = async () => {
    const [allEmp] = await empSQL.getAllEmployees();
    console.log('\n');
    console.log(consoleTable.getTable(allEmp).green);
    init();
};

// VIEW EMPLOYEES BY MANAGER
const viewEmpByManagerPrompt = async () => {
    const [managers] = await empSQL.getEmpManagers();
    const managerNames = managers.map(managers => managers.name);
    const { manager } = await promptInput('manager', 'list', 'Please select the manager whose employees you want to view:', managerNames);
    const [[getManager]] = await empSQL.getEmployeeIDbyFullName(manager);
    const managerID = getManager.id;
    const [subordinates] = await empSQL.getEmployeesByManager(managerID)
    console.log(consoleTable.getTable(subordinates).green);
    init();
};

// VIEW EMPLOYEES BY DEPARTMENT
const viewEmpByDeptPrompt = async () => {
    const [departments] = await deptSQL.getDepartmentNames();
    deptNames = departments.map(departments => departments.name);
    const { dept } = await promptInput('dept', 'list', 'Please choose the department whose employees you wish to view:', deptNames);
    const [[getDept]] = await deptSQL.getDepartmentIDByName(dept);
    const [employees] = await empSQL.getEmployeesByDepartment(getDept.id);
    console.log(consoleTable.getTable(employees).green);
    init();
};

// VIEW DEPARTMENT BUDGET
const viewDeptBudgetPrompt = async () => {
    const [departments] = await deptSQL.getDepartmentNames();
    deptNames = departments.map(departments => departments.name);
    const { dept } = await promptInput('dept', 'list', 'Please choose the department whose budget you wish to view:', deptNames);
    const [[getDept]] = await deptSQL.getDepartmentIDByName(dept);
    const [budget] = await deptSQL.getDeptBudget(getDept.id);
    console.log(consoleTable.getTable(budget).green);
    init();
};

// ADD A DEPARTMENT
const addDeptPrompt = async () => {
    const promptMessage = 'Please enter the department name you want to add:'.blue;
    const { deptName } = await promptInput('deptName', 'input', promptMessage, [], (input) => validation(input, '', 'NOT_NULL'));
    await deptSQL.addDepartment(deptName);
    console.log(`\n Department ${deptName} has been added to the database \n`.brightGreen);
    init();
};

// ADD A ROLE
const addRolePrompt = async () => {
    const role = [];
    const promptMessage_title = 'Please enter the title for the role:'.blue;
    const promptMessage_salary = 'Please enter the salary for the role:'.blue;
    const promptMessage_dept = 'Please choose the department from the list';
    const [allDept] = await deptSQL.getAllDepartments();
    const deptNames = allDept.map(allDept => allDept.Department);

    const { roleTitle } = await promptInput('roleTitle', 'input', promptMessage_title, [], (input) => validation(input, '', 'NOT_NULL'));
    const { roleSalary } = await promptInput('roleSalary', 'input', promptMessage_salary, [], (input) => validation(input, 'INT', 'NOT_NULL'));

    const { deptName } = await promptInput('deptName', 'list', promptMessage_dept, deptNames);
    const [[dept]] = await deptSQL.getDepartmentIDByName(deptName);

    role.push(roleTitle);
    role.push(roleSalary);
    role.push(dept.id);
    await roleSQL.addRole(role);
    console.log(`\n Role ${roleTitle} has been added to the database \n`.brightGreen);
    init();
};

// ADD AN EMPLOYEE
const addEmployeePrompt = async () => {
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
    console.log(`\n Employee ${first_name} ${last_name} has been added to the database \n`.brightGreen);
    init();
};

// UPDATE DEPARTMENT
const updateDeptPrompt = async () => {
    const department = [];
    const promptMessage_name = 'Please enter the department name to be updated:';
    const dept = await promptDeptNames('Please select the department you want to update:')
    const { deptName } = await promptInput('deptName', 'input', promptMessage_name, [], (input) => validation(input, '', 'NOT_NULL'));
    department.push(deptName);
    department.push(dept.id);
    await deptSQL.updateDepartment(department);
    console.log(`\n Department ${deptName} has been updated to the database \n`.brightYellow);
    init();
}

// UPDATE AN EMPLOYEE'S MANAGER
const updateEmpManagerPrompt = async () => {
    const emp = await promptEmployeeFullName('Please choose the Employee for which you wish to update their Manager:')
    const [managers] = await empSQL.getManagersByEmpID(emp.id);
    const managerNames = managers.map(managers => managers.Manager);
    managerNames.unshift('NONE');
    const { manager } = await promptInput('manager', 'list', `Please select the employee's manager`, managerNames);
    let getManager = 'NULL';
    if (manager !== 'NONE') {
        [[getManager]] = await empSQL.getEmployeeIDbyFullName(manager);
    };
    await empSQL.updateEmpManager([getManager.id, emp.id]);
    console.log(`\n  ${manager} is now the manager for the employee with id ${emp.id}. The database has been updated. \n`.brightYellow);
    init();
};

// UPDATE AN EMPLOYEE'S ROLE
const updateEmpRolePrompt = async () => {
    const emp = await promptEmployeeFullName('Please choose the Employee whose role you wish to change:');
    const role = await promptRoleTitles('Please choose the role you want to change for employee:');
    const values = [role.id, emp.id];
    console.log(`\n Role ${role.id} has been updated for employee ${emp.id} in the database. \n`.brightYellow);
    await empSQL.updateEmpRole(values);
    init();
};

// DELETE DEPARTMENT
const delDeptPrompt = async () => {
    const dept = await promptDeptNames('Please select the department you want to delete:'.red);
    const confirm = await promptInput('delete', 'confirm', `\n ARE YOU SURE YOU WANT TO DELETE DEPARTMENT ${dept.id}`.brightGreen.red);
    if (confirm.delete) {
        await deptSQL.deleteDepartment(dept.id);
    }
    init();
}

// DELETE ROLE
const deleteRolePrompt = async () => {
    const role = await promptRoleTitles('Please select the role you want to delete:'.red)
    const confirm = await promptInput('delete', 'confirm', `\n Are you sure you want to DELETE ROLE ${role.id}`.brightGreen.red);
    if (confirm.delete) {
        await roleSQL.deleteRole(role.id);
    }
    init();
};

// DELETE EMPLOYEE
const deleteEmployeePrompt = async () => {
    const message = 'Please choose the Employee whose role you wish to delete:';
    const emp = await promptEmployeeFullName(message);
    const confirm = await promptInput('delete', 'confirm', `\n Are you sure you want to DELETE EMPLOYEE ${emp.id}`.brightGreen.red);
    if (confirm.delete) {
        await empSQL.deleteEmployee(emp.id);
    }
    init();
};

// Helper prompt codes
const promptRoleTitles = async (message) => {
    const [roleTitles] = await roleSQL.getRoleTitles();
    const titles = roleTitles.map((roleTitles => roleTitles.title));
    const { role_title } = await promptInput('role_title', 'list', message, titles);
    const [[role]] = await roleSQL.getRoleIDbyTitle(role_title);
    return role;
};

const promptEmployeeFullName = async (message) => {
    const [employees] = await empSQL.getEmployeesFullName();
    const emp_fullNames = employees.map((employees => employees.Employee));
    const { empFullName } = await promptInput('empFullName', 'list', message, emp_fullNames);
    const [[emp]] = await empSQL.getEmployeeIDbyFullName(empFullName);
    return emp;
}

const promptDeptNames = async (message) => {
    const [departments] = await deptSQL.getDepartmentNames();
    const deptNames = departments.map(departments => departments.name);
    const { deptName } = await promptInput('deptName', 'list', message, deptNames);
    const [[dept]] = await deptSQL.getDepartmentIDByName(deptName);
    return dept;
}

const init = async () => {

    const menuArr = [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'View Employees By Manager',
        'View Employees By Department',
        'View Department Budget',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Department',
        'Update Employee Manager',
        'Update Employee Role',
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'Quit'
    ];
    const startMenu = await promptInput('choice', 'list', 'What would you like to do?', menuArr);
    console.clear();
    switch (startMenu.choice) {
        case "View All Departments": {
            console.clear();
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
            console.clear();
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
            console.clear();
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
        case 'Update Employee Manager': {
            updateEmpManagerPrompt();
            break;
        }
        case 'View Employees By Manager': {
            viewEmpByManagerPrompt();
            break;
        }
        case 'View Employees By Department': {
            viewEmpByDeptPrompt();
            break;
        }
        case 'View Department Budget': {
            viewDeptBudgetPrompt();
            break;
        }
        case 'Quit': {
            process.exit();
        }
        default:
            return console.log("Make a choice")
    };
};

init();
