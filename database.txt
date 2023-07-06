DROP DATABASE IF EXISTS udpt;
CREATE DATABASE IF NOT EXISTS udpt;
USE udpt;

CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255),
  type VARCHAR(50),
  fullname VARCHAR(255)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  level VARCHAR(50),
  status VARCHAR(50)
);

CREATE TABLE data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE project (
  id INT AUTO_INCREMENT PRIMARY KEY,
  adminID INT,
  nameProject VARCHAR(255),
  type VARCHAR(50),
  listNhan VARCHAR(255),
  time DATETIME,
  timeEnd DATETIME,
  maxEmployees INT,
  status VARCHAR(50),
  input VARCHAR(255),
  output VARCHAR(255),
  dataID INT,
  FOREIGN KEY (adminID) REFERENCES admin(id),
  FOREIGN KEY (dataID) REFERENCES data(id)
);

CREATE TABLE data_list (
  id INT AUTO_INCREMENT PRIMARY KEY,
  col1 VARCHAR(255),
  col2 VARCHAR(255),
  col3 VARCHAR(255),
  nhan VARCHAR(255),
  data_id INT,
  FOREIGN KEY (data_id) REFERENCES data(id)
);

CREATE TABLE employee_project (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projectID INT,
  employeeID INT,
  FOREIGN KEY (projectID) REFERENCES project(id),
  FOREIGN KEY (employeeID) REFERENCES employee(id)
);

CREATE TABLE data_employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  col1 VARCHAR(255),
  col2 VARCHAR(255),
  col3 VARCHAR(255),
  nhan VARCHAR(255),
  employee_project_id INT,
  FOREIGN KEY (employee_project_id) REFERENCES employee_project(id)
);

INSERT INTO admin (email, password, type, fullname) VALUES
  ('admin1@example.com', 'adminpass1', 'Admin', 'Admin 1'),
  ('admin2@example.com', 'adminpass2', 'Admin', 'Admin 2'),
  ('admin3@example.com', 'adminpass3', 'Admin', 'Admin 3'),
  ('admin4@example.com', 'adminpass4', 'Admin', 'Admin 4'),
  ('admin5@example.com', 'adminpass5', 'Admin', 'Admin 5');

INSERT INTO employee (name, level, status) VALUES
  ('Employee 1', 'Level 1', 'Active'),
  ('Employee 2', 'Level 2', 'Active'),
  ('Employee 3', 'Level 1', 'Inactive'),
  ('Employee 4', 'Level 3', 'Active'),
  ('Employee 5', 'Level 2', 'Inactive');

INSERT INTO data (name) VALUES
  ('Data 1'),
  ('Data 2'),
  ('Data 3'),
  ('Data 4'),
  ('Data 5');

INSERT INTO project (adminID, nameProject, type, listNhan, time, timeEnd, maxEmployees, status, input, output, dataID) VALUES
  (1, 'Project 1', 'Type 1', 'Nhan 1, Nhan 2', '2023-07-01', '2023-07-31', 10, 'Active', 'Input 1', 'Output 1', 1),
  (2, 'Project 2', 'Type 2', 'Nhan 3, Nhan 4', '2023-08-01', '2023-08-31', 5, 'Active', 'Input 2', 'Output 2', 2),
  (1, 'Project 3', 'Type 1', 'Nhan 1, Nhan 3', '2023-09-01', '2023-09-30', 8, 'Inactive', 'Input 3', 'Output 3', 3),
  (3, 'Project 4', 'Type 3', 'Nhan 2, Nhan 4', '2023-07-01', '2023-07-31', 6, 'Active', 'Input 4', 'Output 4', 4),
  (4, 'Project 5', 'Type 2', 'Nhan 1, Nhan 4', '2023-08-01', '2023-08-31', 4, 'Inactive', 'Input 5', 'Output 5', 5);

INSERT INTO data_list (col1, col2, col3, nhan, data_id) VALUES
  ('Value 1', 'Value 2', 'Value 3', 'Nhan 1', 1),
  ('Value 4', 'Value 5', 'Value 6', 'Nhan 2', 1),
  ('Value 7', 'Value 8', 'Value 9', 'Nhan 3', 2),
  ('Value 10', 'Value 11', 'Value 12', 'Nhan 4', 2),
  ('Value 13', 'Value 14', 'Value 15', 'Nhan 1', 3);

INSERT INTO employee_project (projectID, employeeID) VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (3, 4),
  (3, 5);

INSERT INTO data_employee (col1, col2, col3, nhan, employee_project_id) VALUES
  ('Value 1', 'Value 2', 'Value 3', 'Nhan 1', 1),
  ('Value 4', 'Value 5', 'Value 6', 'Nhan 2', 2),
  ('Value 7', 'Value 8', 'Value 9', 'Nhan 3', 3),
  ('Value 10', 'Value 11', 'Value 12', 'Nhan 4', 4),
  ('Value 13', 'Value 14', 'Value 15', 'Nhan 1', 5);