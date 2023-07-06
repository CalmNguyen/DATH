CREATE TABLE data_employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  col1 VARCHAR(255),
  col2 VARCHAR(255),
  col3 VARCHAR(255),
  nhan VARCHAR(255),
  employee_project_id INT,
  FOREIGN KEY (employee_project_id) REFERENCES employee_project(id)
);

INSERT INTO data_employee (col1, col2, col3, nhan, employee_project_id)
SELECT dl.col1, dl.col2, dl.col3, dl.nhan, ep.id
FROM data_list dl
JOIN data d ON dl.data_id = d.id
JOIN employee_project ep ON dl.data_id = ep.projectID;
