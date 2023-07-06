import { useState, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../header';
import { Button } from 'reactstrap';
function Upgrade({ project }) {
    const [listDataEmployeesSelected, set_listDataEmployeesSelected] = useState(project && project.length > 0 ? project.listEmployee : [])
    const [employees, set_employees] = useState([])
    const [open_modal_employees, set_open_modal_employees] = useState(false)

    useEffect(() => {
        // Lấy danh sách nhân viên từ API
        fetch('http://127.0.0.1:5000/employees', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + 'token'
            },
            timeout: 2000,
        })
            .then((response) => response.json())
            .then((actualData) => {
                if (actualData.result === 1) {
                    set_employees(actualData.data);
                } else {
                    alert(actualData.message);
                }
            });
    }, []);

    return (
        <div>
            <Header />
            <h1 style={{ padding: 10 }}>Danh sách người gán nhãn</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.level}</td>
                            <td>{employee.status}</td>
                            <td>
                                <Button
                                    onClick={() => {
                                        // Thêm hoặc xóa nhân viên khỏi danh sách được chọn
                                        const isSelected = listDataEmployeesSelected.some(
                                            (item) => item.id === employee.id
                                        );
                                        if (isSelected) {
                                            const updatedListData = listDataEmployeesSelected.filter(
                                                (item) => item.id !== employee.id
                                            );
                                            set_listDataEmployeesSelected(updatedListData);
                                        } else {
                                            const updatedListData = [...listDataEmployeesSelected, employee];
                                            set_listDataEmployeesSelected(updatedListData);
                                        }
                                    }}
                                >
                                    Edit
                                </Button>
                                {/* {listDataEmployeesSelected.some((item) => item.id === employee.id)
                                        ? "Remove"
                                        : "Add"} */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default memo(Upgrade);
