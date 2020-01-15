DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;



CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);



CREATE TABLE employee_role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INT,
index department_id (department_id),
FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);


CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
index role_id (role_id),
index manager_id (manager_id),
FOREIGN KEY (role_id) REFERENCES employee_role(id) ON DELETE CASCADE,
FOREIGN KEY (manager_id) REFERENCES employee_role(id) ON DELETE CASCADE
);





