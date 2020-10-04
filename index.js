const inquirer = require('inquirer');
const { connection } = require('./config/connection');
const { insertDepts, insertRoles, insertEmployees, selectDepts, selectRoles, selectEmployees, updateEmployees, deleteDepts, deleteRoles, deleteEmployees, selectSum, selectBudget, selectEmployeeByManager } = require('./model/queries');
const { startPrompt, addDeptPrompt, addRolePrompt, addEmployeePrompt } = require('./model/prompts');

connection.connect(function(err) {
  if (err) throw err;
  start();
});

const start = () => {
  inquirer.prompt(startPrompt).then( ans => {
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
      case 'View Employees by Manager':
        viewByManager();
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
      case 'View the Total Utilized Budget of a Department':
        deptBudget();
        break;
      default:
        process.exit(22);
        break;
    }
  })
}

const addDept = () => {
  inquirer.prompt(addDeptPrompt).then(({name}) => {
    connection.query(insertDepts, {name}, err => {
      if (err) throw err;
    });
    console.log(`Added ${name} department to the database.`);
    start();
  })
}
const addRole = () => {
  inquirer.prompt(addRolePrompt).then(({title, salary, department_id}) => {
    connection.query(insertRoles, {title, salary, department_id}, err => {
      if (err) throw err;
    });
    console.log(`Added ${title} role to the database.`);
    start();
  })
}
const addEmployee = () => {
  connection.query(selectRoles, (err, res) => {
    if (err) throw err;
    let rolesArr = [];
    for (let i = 0; i < res.length; i++) {
      rolesArr.push(res[i]);
    }
    addEmployeePrompt.push({
      name: 'role',
      type: 'list',
      message: "What is the employee's role?",
      choices: function() {
        return res.map(res => res.title);
      }
    });
    inquirer.prompt(addEmployeePrompt).then((res) => {
      let first_name = res.first;
      let last_name = res.last;
      let role_id;
      for (let i = 0; i < rolesArr.length; i++) {
        if (res.role === rolesArr[i].title) {
          role_id = rolesArr[i].id;
        }
      }
      connection.query(selectEmployees, (err, res) => {
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
            let arr = []
            if (res.length > 0) {
              for (let i = 0; i < employeeArr.length; i++) {
                arr.push(`${employeeArr[i].first_name} ${employeeArr[i].last_name}`);
              }
            }
            arr.push('No one');
            return arr;
          }
        }).then(res => {
          let manager_id;
          for (let i = 0; i < employeeArr.length; i++) {
            if (res.manager === `${employeeArr[i].first_name} ${employeeArr[i].last_name}`) {
              manager_id = employeeArr[i].id;
            }
          }
          connection.query(insertEmployees, {first_name, last_name, role_id, manager_id}, err => {
            if (err) throw err;
          });
          console.log(`Added employee ${first_name} ${last_name} to the database.`);
          start();
        });
      });
    })
  })
}

const viewDept = () => {
  connection.query(selectDepts, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  })
}
const viewRole = () => {
  connection.query(selectRoles, (err, res) => {
    if (err) throw err
    console.table(res);
    start();
  })
}
const viewEmployee = () => {
  connection.query(selectEmployees, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  })
}

const updateRole = () => {
  connection.query(selectEmployees, (err, res) => {
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
      let first_name;
      let last_name;
      for (let i = 0; i < employeeArr.length; i++) {
        if (res.employee === `${employeeArr[i].first_name} ${employeeArr[i].last_name}`) {
          id = employeeArr[i].id;
          first_name = employeeArr[i].first_name;
          last_name = employeeArr[i].last_name;
        }
      }
      connection.query(selectRoles, (err, res) => {
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
          connection.query(updateEmployees, [{role_id}, {id}], err => {
            if (err) throw err;
          })
          console.log(`${first_name} ${last_name}'s role has been updated to "${res.role}".`);
          start();
        });
      });
    });
  });
}
const updateManager = () => {
  connection.query(selectEmployees, (err, res) => {
    if (err) throw err;
    let employeeArr = [];
    for (let i = 0; i < res.length; i++) {
      employeeArr.push(res[i]);
    }
    const choices = () => {
      let arr = []
      if (res.length > 0) {
        for (let i = 0; i < employeeArr.length; i++) {
          arr.push(`${employeeArr[i].first_name} ${employeeArr[i].last_name}`);
        }
      }
      arr.push('No one');
      return arr;
    }
    inquirer.prompt([
      {
        name: 'employee',
        type: 'list',
        message: "Which employee's manager do you want to update?",
        choices: choices
      },
      {
        name: 'manager',
        type: 'list',
        message: "Which employee do you want to set as manager for the selected employee?",
        choices: choices
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
      connection.query(updateEmployees, [{manager_id}, {id}], err => {
        if (err) throw err;
      })
      console.log(`${res.manager} has been set as the manager for ${res.employee}.`);
      start();
    });
  });
}

const viewByManager = () => {
  connection.query(selectEmployees, (err, res) => {
    if (err) throw err;
    let employeeArr = [];
    for (let i = 0; i < res.length; i++) {
      employeeArr.push(res[i]);
    }
    inquirer.prompt([
      {
        name: 'employee',
        type: 'list',
        message: "Pick an employee to see who they manage.",
        choices: function () {
          let arr = []
          if (res.length > 0) {
            for (let i = 0; i < employeeArr.length; i++) {
              arr.push(`${employeeArr[i].first_name} ${employeeArr[i].last_name}`);
            }
          }
          return arr;
        }
      }
    ]).then(res => {
      let manager_id;
      for (let i = 0; i < employeeArr.length; i++) {
        if (res.employee === `${employeeArr[i].first_name} ${employeeArr[i].last_name}`) {
          manager_id = employeeArr[i].id;
        }
      }
      connection.query(selectEmployeeByManager, manager_id,(err, res) => {
        if (err) throw err;
        if (Object.keys(res).length !== 0) {
          console.table(res);
        } else {
          console.log('The person you have selected currently does not have any employees working under them.');
        }
        start();
      })
    });
  })
}

const deleteDept = () => {
  connection.query(selectDepts, (err, res) => {
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
      connection.query(deleteDepts, {id}, err => {
        if (err) throw err;
      })
      console.log(`Deleted the ${res.department} department from the database.`);
      start();
    });
  });
}
const deleteRole = () => {
  connection.query(selectRoles, (err, res) => {
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
      connection.query(deleteRoles, {id}, err => {
        if (err) throw err;
      })
      console.log(`Deleted the role of ${res.role} from the database.`);
      start();
    });
  });
}
const deleteEmployee = () => {
  connection.query(selectEmployees, (err, res) => {
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
      connection.query(deleteEmployees, {id}, err => {
        if (err) throw err;
      })
      console.log(`Deleted employee ${res.employee} from the database.`);
      start();
    });
  });
}

const deptBudget = () => {
  connection.query(selectDepts, (err, res) => {
    if (err) throw err;
    let deptArr = [];
    for (let i = 0; i < res.length; i++) {
      deptArr.push(res[i]);
    }
    inquirer.prompt({
      name: 'dept',
      type: 'list',
      message: "Choose a department to view its total utilized budget -- i.e. the combined salaries of all employees in that department.",
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
      connection.query(selectBudget, res.dept, (err,res) => {
        if (err) throw err;
        if (Object.keys(res).length !== 0) {
          console.table(res);
        }
      })
      connection.query(selectSum, res.dept, (err,res) => {
        if (err) throw err;
        if (res[0].total !== null) {
          console.log( `The total utilized budget of the ${res[0].name} department is $${res[0].total.toFixed(2)}.`);
        } else {
          console.log( `The total utilized budget of the ${res[0].name} department is $0.00.`);
        }
        start();
      })
    })
  })
}
