const inquirer = require('inquirer');

const startPrompt = {
  name: 'todo',
  type: 'list',
  message: 'What would you like to do?',
  choices: [
    new inquirer.Separator('───────────────────── Add ──────────────────────'),
    'Add Department',
    'Add Role',
    'Add Employee',
    new inquirer.Separator('───────────────────── View ─────────────────────'),
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'View Employees by Manager',
    'View the Total Utilized Budget of a Department',
    new inquirer.Separator('──────────────────── Update ────────────────────'),
    'Update Employee Role',
    'Update Employee Manager',
    new inquirer.Separator('──────────────────── Delete ────────────────────'),
    'Delete Department',
    'Delete Role',
    'Delete Employee',
    new inquirer.Separator('───────────────────── Exit ─────────────────────'),
    'Exit Node.js'
  ]
};

function isNotBlank(input) {
  return input !== '' || "Cannot leave blank";
}

const addDeptPrompt = {
  name: 'name',
  type: 'input',
  message: 'What is the name of the department you want to add?',
  validate: isNotBlank
};

const addRolePrompt = [
  {
    name: 'title',
    type: 'input',
    message: 'What is the title of the role?',
    validate: isNotBlank
  },
  {
    name: 'salary',
    type: 'input',
    message: 'What is the salary of the role?',
    validate: isNotBlank
  },
  {
    name: 'department_id',
    type: 'input',
    message: 'What is the department ID of the role?',
    validate: isNotBlank
  }
];

const addEmployeePrompt = [
  {
    name: 'first',
    type: 'input',
    message: "What is the employee's first name?",
    validate: isNotBlank
  },
  {
    name: 'last',
    type: 'input',
    message: "What is the employee's last name?",
    validate: isNotBlank
  }
];

module.exports = {
  startPrompt,
  addDeptPrompt,
  addRolePrompt,
  addEmployeePrompt,
};
