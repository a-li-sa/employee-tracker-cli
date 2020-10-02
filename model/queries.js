const insertDepts = 'INSERT INTO departments SET ?;';
const insertRoles = 'INSERT INTO roles SET ?;';
const insertEmployees = 'INSERT INTO employees SET ?;';

const selectDepts = 'SELECT * FROM departments;';
const selectRoles = 'SELECT * FROM roles;';
const selectEmployees = 'SELECT * FROM employees;';

const updateEmployees = 'UPDATE employees SET ? WHERE ?;';

const deleteDepts = 'DELETE FROM departments WHERE ?;';
const deleteRoles = 'DELETE FROM roles WHERE ?;';
const deleteEmployees = 'DELETE FROM employees WHERE ?;';

module.exports = {
  insertDepts,
  insertRoles,
  insertEmployees,
  selectDepts,
  selectRoles,
  selectEmployees,
  updateEmployees,
  deleteDepts,
  deleteRoles,
  deleteEmployees,
}
