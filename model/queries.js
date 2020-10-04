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

const deleteDepts = 'DELETE FROM departments WHERE ?;';
const deleteRoles = 'DELETE FROM roles WHERE ?;';
const deleteEmployees = 'DELETE FROM employees WHERE ?;';

const selectSum = `SELECT C.name, sum(B.salary) AS total
FROM employee_trackerDB.employees A 
LEFT JOIN employee_trackerDB.roles B 
ON A.role_id = B.id 
LEFT JOIN employee_trackerDB.departments C 
ON B.department_id = C.id 
WHERE C.name = ?;`

const selectEmployeeByManager = `SELECT DISTINCT C.id, a.id, a.first_name, a.last_name, B.title, C.name AS department, B.salary, concat(D.first_name, ' ', D.last_name) AS manager FROM employee_trackerDB.employees A
LEFT JOIN employee_trackerDB.roles B
ON A.role_id = B.id
LEFT JOIN employee_trackerDB.departments C
ON B.department_id = C.id
LEFT JOIN employee_trackerDB.employees D
ON A.manager_id = D.id
WHERE A.manager_id = ?;`

const selectBudget = `SELECT A.id, A.first_name, A.last_name, B.title, B.salary 
FROM employee_trackerDB.employees A 
LEFT JOIN employee_trackerDB.roles B 
ON A.role_id = B.id 
LEFT JOIN employee_trackerDB.departments C 
ON B.department_id = C.id 
WHERE C.name = ?;`

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
  selectSum,
  selectBudget,
  selectEmployeeByManager,
}
