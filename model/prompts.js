const startPrompt = {
  name: 'todo',
  type: 'list',
  message: 'What would you like to do?',
  choices: ['Add Department', 'Add Role', 'Add Employee', 'View All Departments', 'View All Roles', 'View All Employees', 'Update Employee Role', 'Update Employee Manager', 'Delete Department', 'Delete Role', 'Delete Employee']
};

const addDeptPrompt = {
  name: 'name',
  type: 'input',
  message: 'What is the name of the department you want to add?'
};

const addRolePrompt = [
  {
    name: 'title',
    type: 'input',
    message: 'What is the title of the role?'
  },
  {
    name: 'salary',
    type: 'input',
    message: 'What is the salary of the role?'
  },
  {
    name: 'department_id',
    type: 'input',
    message: 'What is the department ID of the role?'
  }
];

const addEmployeePrompt = [
  {
    name: 'first',
    type: 'input',
    message: "What is the employee's first name?"
  },
  {
    name: 'last',
    type: 'input',
    message: "What is the employee's last name?"
  }
];

module.exports = {
  startPrompt,
  addDeptPrompt,
  addRolePrompt,
  addEmployeePrompt,
};
