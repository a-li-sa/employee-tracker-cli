function isNotBlank(input) {
  return input !== '' || "Cannot leave blank";
}

const startPrompt = {
  name: 'todo',
  type: 'list',
  message: 'What would you like to do?',
  choices: ['Add Department', 'Add Role', 'Add Employee', 'View All Departments', 'View All Roles', 'View All Employees', 'Update Employee Role', 'Update Employee Manager', 'View Employees By Manager', 'Delete Department', 'Delete Role', 'Delete Employee', 'View the total utilized budget of a department']
};

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
