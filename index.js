const inquirer = require('inquirer');
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_trackerDB"
});
connection.connect(function(err) {
  if (err) throw err;
  start();
});

const start = () => {
  inquirer.prompt([
    {
      name: 'todo',
      type: 'list',
      message: 'What would you like to do?',
      // BONUS
      // * View employees by manager
      // * Delete departments, roles, and employees
      // * View the total utilized budget of a department -- ie the combined salaries of all employees in that department
      choices: ['Add Department', 'Add Role', 'Add Employee', 'View All Departments', 'View All Roles', 'View All Employees', 'Update Employee Role', 'Update Employee Manager', 'Delete Department', 'Delete Role', 'Delete Employee']
    }
  ]).then(ans => {
    switch (ans.todo) {
      case 'Add Department':
        addDept();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'View All Departments':
        viewDept();
        break;
      case 'View All Roles':
        viewRole();
        break;
      case 'View All Employees':
        viewEmployee();
        break;
      case 'Update Employee Role':
        updateRole();
        break;
      case 'Update Employee Manager':
        updateManager();
        break;
      case 'Delete Department':
        deleteDept();
        break;
      case 'Delete Role':
        deleteRole();
        break;
      case 'Delete Employee':
        deleteEmployee();
        break;
      default:
        start();
        break;
    }
  })
}
const addDept = () => {
  inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'What is the name of the department you want to add?'
  }).then(({name}) => {
    const query = 'INSERT INTO departments SET ?;';
    connection.query(query, {name}, err => {
      if (err) throw err;
    });
    viewDept();
  })
}
const addRole = () => {
  inquirer.prompt([
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
  ]).then(({title, salary, department_id}) => {
    const query = 'INSERT INTO roles SET ?;';
    connection.query(query, {title, salary, department_id}, err => {
      if (err) throw err;
    });
    viewRole();
  })
}
const addEmployee = () => {
  connection.query('SELECT * FROM roles ;', (err, res) => {
    if (err) throw err;
    let rolesArr = [];
    for (let i = 0; i < res.length; i++) {
      rolesArr.push(res[i]);
    }
    inquirer.prompt([
      {
        name: 'first',
        type: 'input',
        message: "What is the employee's first name?"
      },
      {
        name: 'last',
        type: 'input',
        message: "What is the employee's last name?"
      },
      {
        name: 'role',
        type: 'list',
        message: "What is the employee's role?",
        choices: function() {
            return res.map(res => res.title);
        }
      }
      ]).then((res) => {
        let first_name = res.first;
        let last_name = res.last;
        let role_id;
        for (let i = 0; i < rolesArr.length; i++) {
          if (res.role === rolesArr[i].title) {
            role_id = rolesArr[i].id;
          }
        }
        connection.query('SELECT * FROM employees;', (err, res) => {
          if (err) throw err;
          let employeeArr = [];
          for (let i = 0; i < res.length; i++) {
            employeeArr.push(res[i]);
          }
          inquirer.prompt({
            name: 'manager',
            type: 'list',
            message: "Who is the employee's manager?",
            choices: function() {
              let arr = ['None']
              if (res.length > 0) {
                for (let i = 0; i < employeeArr.length; i++) {
                  arr.push(`${employeeArr[i].first_name} ${employeeArr[i].last_name}`);
                }
              }
              return arr;
            }
          }).then(res => {
            let manager_id;
            for (let i = 0; i < employeeArr.length; i++) {
              if (res.manager === `${employeeArr[i].first_name} ${employeeArr[i].last_name}`) {
                manager_id = employeeArr[i].id;
              }
            }
            const query = 'INSERT INTO employees SET ?;';
            connection.query(query, {first_name, last_name, role_id, manager_id}, err => {
              if (err) throw err;
          });
          viewEmployee();
        });
      });
    })
  })
}
const viewDept = () => {
  connection.query('SELECT * FROM departments;', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  })
}
const viewRole = () => {
  connection.query('SELECT * FROM roles;', (err, res) => {
    if (err) throw err
    console.table(res);
    start();
  })
}
const viewEmployee = () => {
  connection.query('SELECT * FROM employees;', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  })
}
const updateRole = () => {
  connection.query('SELECT * FROM employees;', (err, res) => {
    if (err) throw err;
    let employeeArr = [];
    for (let i = 0; i < res.length; i++) {
      employeeArr.push(res[i]);
    }
    inquirer.prompt({
      name: 'employee',
      type: 'list',
      message: "Which employee's role do you want to update?",
      choices: function () {
        let arr = []
        if (res.length > 0) {
          for (let i = 0; i < employeeArr.length; i++) {
            arr.push(`${employeeArr[i].first_name} ${employeeArr[i].last_name}`);
          }
        }
        return arr;
      }
    }).then(res => {
      let id;
      for (let i = 0; i < employeeArr.length; i++) {
        if (res.employee === `${employeeArr[i].first_name} ${employeeArr[i].last_name}`) {
          id = employeeArr[i].id;
        }
      }
      connection.query('SELECT * FROM roles ;', (err, res) => {
        if (err) throw err;
        let rolesArr = [];
        for (let i = 0; i < res.length; i++) {
          rolesArr.push(res[i]);
        }
        inquirer.prompt(
          {
            name: 'role',
            type: 'list',
            message: "What is the selected employee's updated role?",
            choices: function () {
              return res.map(res => res.title);
            }
          }
        ).then((res) => {
          let role_id;
          for (let i = 0; i < rolesArr.length; i++) {
            if (res.role === rolesArr[i].title) {
              role_id = rolesArr[i].id;
            }
          }
          const query = "UPDATE employees SET ? WHERE ?;";
          connection.query(query, [{role_id}, {id}], err => {
            if (err) throw err;
          })
          viewEmployee();
        });
      });
    });
  });
}
const updateManager = () => {
  connection.query('SELECT * FROM employees;', (err, res) => {
    if (err) throw err;
    let employeeArr = [];
    for (let i = 0; i < res.length; i++) {
      employeeArr.push(res[i]);
    }
    inquirer.prompt([
      {
        name: 'employee',
        type: 'list',
        message: "Which employee's manager do you want to update?",
        choices: function () {
          let arr = []
          if (res.length > 0) {
            for (let i = 0; i < employeeArr.length; i++) {
              arr.push(`${employeeArr[i].first_name} ${employeeArr[i].last_name}`);
            }
          }
          return arr;
        }
      },
      {
        name: 'manager',
        type: 'list',
        message: "Which employee do you want to set as manager for the selected employee?",
        choices: function () {
          let arr = ['None'];
          if (res.length > 0) {
            for (let i = 0; i < employeeArr.length; i++) {
              arr.push(`${employeeArr[i].first_name} ${employeeArr[i].last_name}`);
            }
          }
          return arr;
        }
      }
    ]).then(res => {
      let id;
      let manager_id;
      for (let i = 0; i < employeeArr.length; i++) {
        if (res.employee === `${employeeArr[i].first_name} ${employeeArr[i].last_name}`) {
          id = employeeArr[i].id;
        }
        if (res.manager === `${employeeArr[i].first_name} ${employeeArr[i].last_name}`) {
          manager_id = employeeArr[i].id;
        }
      }
      const query = "UPDATE employees SET ? WHERE ?;";
      connection.query(query, [{manager_id}, {id}], err => {
        if (err) throw err;
      })
      viewEmployee();
    });
  });
}
const deleteEmployee = () => {
  connection.query('SELECT * FROM employees;', (err, res) => {
    if (err) throw err;
    let employeeArr = [];
    for (let i = 0; i < res.length; i++) {
      employeeArr.push(res[i]);
    }
    inquirer.prompt({
      name: 'employee',
      type: 'list',
      message: "Which employee do you want to delete?",
      choices: function () {
        let arr = []
        if (res.length > 0) {
          for (let i = 0; i < employeeArr.length; i++) {
            arr.push(`${employeeArr[i].first_name} ${employeeArr[i].last_name}`);
          }
        }
        return arr;
      }
    }).then(res => {
      let id;
      for (let i = 0; i < employeeArr.length; i++) {
        if (res.employee === `${employeeArr[i].first_name} ${employeeArr[i].last_name}`) {
          id = employeeArr[i].id;
        }
      }
      const query = "DELETE FROM employees WHERE ?;";
      connection.query(query, {id}, err => {
        if (err) throw err;
      })
      console.log(`Deleted ${res.employee} from the database`);
      viewEmployee();
    });
  });
}
const deleteRole = () => {
  connection.query('SELECT * FROM roles;', (err, res) => {
    if (err) throw err;
    let rolesArr = [];
    for (let i = 0; i < res.length; i++) {
      rolesArr.push(res[i]);
    }
    inquirer.prompt({
      name: 'role',
      type: 'list',
      message: "Which role do you want to delete?",
      choices: function () {
        let arr = []
        if (res.length > 0) {
          for (let i = 0; i < rolesArr.length; i++) {
            arr.push(rolesArr[i].title);
          }
        }
        return arr;
      }
    }).then(res => {
      let id;
      for (let i = 0; i < rolesArr.length; i++) {
        if (res.role === rolesArr[i].title) {
          id = rolesArr[i].id;
        }
      }
      const query = "DELETE FROM roles WHERE ?;";
      connection.query(query, {id}, err => {
        if (err) throw err;
      })
      console.log(`Deleted ${res.role} from the database`);
      viewRole();
    });
  });
}
const deleteDept = () => {
  connection.query('SELECT * FROM departments;', (err, res) => {
    if (err) throw err;
    let deptArr = [];
    for (let i = 0; i < res.length; i++) {
      deptArr.push(res[i]);
    }
    inquirer.prompt({
      name: 'department',
      type: 'list',
      message: "Which department do you want to delete?",
      choices: function () {
        let arr = []
        if (res.length > 0) {
          for (let i = 0; i < deptArr.length; i++) {
            arr.push(deptArr[i].name);
          }
        }
        return arr;
      }
    }).then(res => {
      let id;
      for (let i = 0; i < deptArr.length; i++) {
        if (res.department === deptArr[i].name) {
          id = deptArr[i].id;
        }
      }
      const query = "DELETE FROM departments WHERE ?;";
      connection.query(query, {id}, err => {
        if (err) throw err;
      })
      console.log(`Deleted ${res.department} from the database`);
      viewDept();
    });
  });
}