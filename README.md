<div align="center">

# Employee Tracker

Built with Node.js and MySQL

* URL of the GitHub repository: https://github.com/a-li-sa/employee-tracker-cli

</div>

## Table of Contents 

* [Description](#description)
  * [User Story](#user-story)
* [Installation](#installation)
* [Usage](#usage)
* [Built With](#built-with)
* [License](#license)

## Description

This command line application makes it easy for non-developers to view and interact with information stored in their database. 

### User Story

As a business owner, I want to be able to view and manage the departments, roles, and employees in my company, so that I can organize and plan my business.

## Installation

The user may clone this repository and must have Node and MySQL installed. 

The dependencies are [Inquirer](https://www.npmjs.com/package/inquirer) for collecting input from the user and [MySQL](https://www.npmjs.com/package/mysql) to connect to the MySQL database and perform queries. To install the dependencies, run the following command:
```
npm i
```

## Usage

Using this application, the user is able to do the following:
* Add departments, roles, employees 
* View departments, roles, employees 
* Update employee roles 
* Update employee managers 
* View employees by manager 
* Delete departments, roles, and employees 
* View the total utilized budget of a department -- ie the combined salaries of all employees in that department 

Before running the command below, the [schema.sql](https://github.com/a-li-sa/employee-tracker-cli/blob/master/model/schema.sql) script should be executed in MySQL Workbench in order for the user to connect to the database. 

The application will be invoked with the following command:
```
node index
```

This [video](https://www.youtube.com/watch?v=IDFTntj2rJE&feature=youtu.be) demonstrates application functionality.

## Built With

* [Node.js](https://nodejs.org/en/) - An open-source JavaScript runtime environment that executes JavaScript outside of the browser. 
* [MySQL](https://www.mysql.com/) - A database system that runs on a server

## License

Copyright 2020 Alisa Poon

Licensed under the [MIT License](https://opensource.org/licenses/MIT)
