import React, { useState, useEffect } from 'react';
import { Button, Input } from 'reactstrap';
import Header from '../header';
import { useNavigate, useParams } from 'react-router-dom';

function Upgrade_detail({ }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const handleDelete = () => {
        navigate('/ds-du-an')
        // Xử lý xóa nhân viên theo ID
        // Gọi API hoặc thực hiện các xử lý khác tại đây
    };

    const [employee, set_employee] = useState({});

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/employees/' + id, {
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
                    set_employee(actualData.data);
                } else {
                    alert(actualData.message);
                }
            });
    }, []);

    const handleUpgrade = () => {
        // Gọi API để cập nhật thông tin nhân viên
        fetch('http://127.0.0.1:5000/api/employees/' + id, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + 'token'
            },
            body: JSON.stringify(employee),
        })
            .then((response) => response.json())
            .then((actualData) => {
                if (actualData.result === 1) {
                    alert(actualData.message);
                } else {
                    alert(actualData.message);
                }
            });
    };

    const handleInputChange = (e, field) => {
        set_employee((prevEmployee) => ({
            ...prevEmployee,
            [field]: e.target.value,
        }));
    };

    return (
        <div>
            <Header />
            <div style={{ padding: '20px' }}>
                <h1>Thông tin nhân viên</h1>
                <div style={{ margin: '20px 0' }}>
                    <p><strong>ID:</strong> {employee.id}</p>
                    <p><strong>Name:</strong> <Input value={employee.name} onChange={(e) => handleInputChange(e, 'name')} /></p>
                    <p><strong>Level:</strong> <Input value={employee.level} onChange={(e) => handleInputChange(e, 'level')} /></p>
                    <p><strong>Status:</strong> <Input value={employee.status} onChange={(e) => handleInputChange(e, 'status')} /></p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button color="danger" onClick={handleDelete}>Trở về</Button>
                    <Button color="primary" onClick={handleUpgrade}>Cập nhật</Button>
                </div>
            </div>
        </div>
    );
}

export default Upgrade_detail;
