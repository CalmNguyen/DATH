import React, { useState, memo, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { AiFillCloseCircle } from "react-icons/ai";
import '../style/style.css'
import Header from '../header'
import { auth } from '../auth';
Modal.setAppElement('#root'); // Thiết lập phần tử gốc của ứng dụng

function List_Project() {
    const [data, set_data] = useState([])
    const [employee, set_employee] = useState([])
    const [tke, set_tke] = useState({})
    console.log('in')
    useEffect(() => {
        // fetch('http://127.0.0.1:5000/list-project', {
        fetch('http://127.0.0.1:5000/api/thong-ke', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + 'token'
            },
            timeout: 2000,
            // body: JSON.stringify([]),
        }).then((response) => response.json())
            .then((actualData) => {
                // console.log(actualData)
                if (actualData.result == 1) {
                    set_tke(actualData)

                }
                else {
                    alert(actualData.message)
                }
            });
    }, [])
    useEffect(() => {
        // fetch('http://127.0.0.1:5000/list-project', {
        fetch('http://127.0.0.1:5000/employees', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + 'token'
            },
            timeout: 2000,
            // body: JSON.stringify([]),
        }).then((response) => response.json())
            .then((actualData) => {
                // console.log(actualData)
                if (actualData.result == 1) {
                    set_employee(actualData.data)

                }
                else {
                    alert(actualData.message)
                }
            });
    }, [])
    useEffect(() => {
        // fetch('http://127.0.0.1:5000/list-project', {
        fetch('http://127.0.0.1:5000/projects', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + 'token'
            },
            timeout: 2000,
            // body: JSON.stringify([]),
        }).then((response) => response.json())
            .then((actualData) => {
                // console.log(actualData)
                if (actualData.result == 1) {
                    set_data(actualData.data)

                }
                else {
                    alert(actualData.message)
                }
            });
    }, [])
    const type_name = {
        "Type 1": "Phân loại văn bản",
        "Type 2": "Hỏi đáp",
        "Type 3": "Dịch máy",
        "Type 4": "Gán nhãn thực thể",
        "Type 5": "Gán nhãn cặp văn bản đồng nghĩa",
        "Type 6": "Gán nhãn câu trả lời của cặp câu hỏi và văn bản",
        "Type 7": "Tìm câu hỏi đồng nghĩa"
    }
    const backgroundColor = {
        "0": "#FFFF00",
        "1": "#736AFF",
        "-1": "#FF0000"
    }
    return (
        <div>
            <Header />

            <div style={{ marginLeft: 10 }}>
                <div className='tk-gradient'>
                    <div className='tk-gradient-each' >
                        <p style={{ fontSize: 20, fontWeight: 600 }}>{tke.dataListCount ? tke.dataListCount : 0}</p>
                        <p style={{ fontSize: 18, fontWeight: 400 }}>Số mẫu dữ liệu</p>
                    </div>
                    <div className='tk-gradient-each'>
                        <p style={{ fontSize: 20, fontWeight: 600 }}>{tke.projectCount ? tke.projectCount : 0}</p>
                        <p style={{ fontSize: 18, fontWeight: 400 }}>Dự án</p>
                    </div>
                    <div className='tk-gradient-each'>
                        <p style={{ fontSize: 20, fontWeight: 600 }}>{tke.projectFinished ? tke.projectFinished : 0}</p>
                        <p style={{ fontSize: 18, fontWeight: 400 }}>Dự án hoàn thành</p>
                    </div>
                    <div className='tk-gradient-each'>
                        <p style={{ fontSize: 20, fontWeight: 600 }}>{tke.employeeCount ? tke.employeeCount : 0}</p>
                        <p style={{ fontSize: 18, fontWeight: 400 }}>Thành viên</p>
                    </div>
                </div>

                <h1 style={{ textAlign: 'center' }}>Danh sách dự án</h1>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 40, border: '0.5px solid black', borderColor: 'black', borderTop: 0, borderLeft: 0, borderRight: 0 }}>
                    <div style={{ width: '3%', fontWeight: 600, marginRight: 10 }}><p>STT</p></div>
                    <div style={{ width: '18%', fontWeight: 600, marginRight: 10 }}><p>Tên dự án</p></div>
                    <div style={{ width: '18%', fontWeight: 600, marginRight: 10 }}><p>Loại</p></div>
                    <div style={{ width: '14%', fontWeight: 600, marginRight: 10 }}><p>Số người tham gia</p></div>
                    <div style={{ width: '12%', fontWeight: 600 }}><p>Số người tối đa</p></div>
                    <div style={{ width: '12%', fontWeight: 600 }}><p>Thời gian tạo</p></div>
                    <div style={{ width: '12%', fontWeight: 600, display: 'flex', alignItems: 'center', }}><p>Status</p></div>
                    <div style={{ width: '10%', fontWeight: 600 }}><p>Action</p></div>
                </div>
                {data.map((item, index) => (
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                        <div style={{ width: '3%', fontWeight: 400, marginRight: 10 }}><p>{index}</p></div>
                        <div style={{ width: '20%', fontWeight: 400, marginRight: 10 }}><p>{item.nameProject}</p></div>
                        <div style={{ width: '20%', fontWeight: 400, marginRight: 10 }}><p>{type_name[item.type.type]}</p></div>
                        <div style={{ width: '15%', fontWeight: 400, marginRight: 10 }}><p>{item.listEmployee.length}</p></div>
                        <div style={{ width: '12%', fontWeight: 400 }}><p>{item.maxEmployees}</p></div>
                        <div style={{ width: '12%', fontWeight: 400 }}><p>{item.time}</p></div>
                        <div style={{ width: '12%', fontWeight: 400, display: 'flex', alignItems: 'center', }}><p style={{ border: '1px solid rgba(0,0,0,0.5)', width: '80%', textAlign: 'center', borderRadius: 10, justifyContent: 'center', display: 'flex', alignItems: 'center', backgroundColor: backgroundColor[item.status], color: 'black' }}>{item.status == 0 ? 'Processing' : item.status == 1 ? 'Finished' : 'Lated'}</p></div>
                        <div style={{ marginLeft: 0, width: '10%', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <a href={'/bieu-do/' + item.id} style={{ marginLeft: 0, color: '#43BFC7' }}>Thống kê</a>
                            <a href={'/about/' + item.id} style={{ marginLeft: 0 }}>Xem chi tiết</a>
                            <a href={'/edit-project/' + item.id} style={{ marginLeft: 0, color: 'red' }}>Điều chỉnh</a>
                            {/* <a href={'/edit-project/' + item.id} style={{ marginLeft: 0, color: 'red' }}>Điều chỉnh</a> */}
                        </div>
                    </div>
                ))}
            </div>

        </div>

    );
}

export default memo(List_Project);
