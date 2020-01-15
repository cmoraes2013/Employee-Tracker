USE employee_tracker;

INSERT INTO department(name) VALUES("Sales");
INSERT INTO employee_role(title, salary, department_id) VALUES ("Sales Manager", 30000, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("David", "Duarte", 1, null);

