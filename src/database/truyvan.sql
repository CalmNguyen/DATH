truy vấn lấy 1 nhãn
SELECT de.col1, de.nhan FROM data_employee de, employee_project ep, project p WHERE p.type='Type 1' and p.id = ep.projectID and ep.id = de.employee_project_id and p.id=10

UPDATE data_employee de
JOIN employee_project ep ON de.employee_project_id = ep.id
JOIN project p ON p.id = ep.projectID
SET de.nhan = 
    CASE
        WHEN LEFT(de.nhan, 2) = 'Py' THEN 'PHP'
        ELSE 'Py'
    END
WHERE p.type = 'Type 1' AND p.id = 10;