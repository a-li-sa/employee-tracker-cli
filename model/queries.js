const insertDepts = 'INSERT INTO departments SET ?;';
const insertRoles = 'INSERT INTO roles SET ?;';
const insertEmployees = 'INSERT INTO employees SET ?;';

const selectDepts = 'SELECT * FROM departments;';
const selectRoles = 'SELECT * FROM roles;';
const selectEmployees = `SELECT a.id, a.first_name, a.last_name, B.title, C.name AS department, B.salary, concat(D.first_name, ' ', D.last_name) AS manager FROM employees A
LEFT JOIN roles B
ON A.role_id = B.id
LEFT JOIN departments C
ON B.department_id = C.id
LEFT JOIN employees D
ON A.manager_id = D.id;`;

const updateEmployees = 'UPDATE employees SET ? WHERE ?;';
const selectManager = 'SELECT * FROM employees WHERE manager_id IS NULL;';

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
  selectManager,
  deleteDepts,
  deleteRoles,
  deleteEmployees,
}
