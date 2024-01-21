import React, { useEffect, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import Chart from './Doughnut';
import { AiFillCloseCircle, AiFillCheckCircle, AiTwotoneEdit } from "react-icons/ai";
import Header from '../header';
const App = () => {
    const data = [2, 3, 2, 9];
    const { id } = useParams();
    const list_type = {
        "1": "Phân loại văn bản",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": ""
    }
    const [employees, set_employees] = useState(
        [])
    const [tk_employees, set_tk_employees] = useState([1, 2, 3, 0])
    const [project, set_project] = useState({
        "id": "2",
        "nameProject": "Gán nhãn",
        "type": {
            "type": "6",
            "listNhan": [
                "nhãn 1",
                "nhãn 2",
                "nhãn 3"
            ]
        },
        "listEmployee": [
            { 'id': 1, 'name': 'Nguyễn Văn A', 'level': 3, 'project_join': 1, 'status': 0 },
            { 'id': 2, 'name': 'Nguyễn Văn A', 'level': 3, 'project_join': 1, 'status': 0 },
            { 'id': 12, 'name': 'Nguyễn Văn A', 'level': 3, 'project_join': 1, 'status': 0 }
        ],
        "time": "28/03/2023",
        "timeEnd": "",
        "dataSequence": [
            [
                "Câu 1",
                "câu 2"
            ],
            [
                "câu 3",
                "câu 4"
            ]
        ],
        "maxEmployees": "30",
        "status": 1
    })

    useEffect(() => {
        fetch('http://127.0.0.1:5000/projectn/' + id, {
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
                // console.log('in')
                console.log(actualData)
                if (actualData.result == 1) {
                    set_project(actualData.data)
                }
                else {
                    alert(actualData.message)
                }
            });
    }, [])
    useEffect(() => {
        fetch('http://127.0.0.1:5000/list-employees', {
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
                // console.log('in')
                // console.log(actualData)
                if (actualData.result == 1) {
                    set_employees(actualData.data)
                }
                else {
                    alert(actualData.message)
                }
            });
    }, [])
    const [tk, set_tk] = useState([])
    const [tk_nhan, set_tk_nhan] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/statistics/' + String(id), {
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
                const data = actualData.data
                if (actualData.result == 1) {
                    set_tk_nhan(actualData.list_nhan)
                    let temp = []
                    for (let i of actualData.list_nhan) {
                        temp.push(actualData.statistics[i])
                    }
                    // set_tk(actualData.statistics)
                    set_tk(temp)
                }
                else {
                    alert(actualData.message)
                }
            });
    }, [])
    return (
        <div>
            <Header />
            <h1 style={{ marginLeft: 30, margin: 30 }}>{project.nameProject}</h1>
            <div className='tk-gradient'>
                <div className='tk-gradient-each' >
                    <p style={{ fontSize: 20, fontWeight: 600 }}>{project.listEmployee.filter((items) => items.level == 3).length}</p>
                    <p style={{ fontSize: 18, fontWeight: 400 }}>Tổng số mẫu</p>
                </div>
                <div className='tk-gradient-each'>
                    <p style={{ fontSize: 20, fontWeight: 600 }}>{project.listEmployee.filter((items) => items.level == 4).length}</p>
                    <p style={{ fontSize: 18, fontWeight: 400 }}>Level 2</p>
                </div>
                <div className='tk-gradient-each'>
                    <p style={{ fontSize: 20, fontWeight: 600 }}>{project.listEmployee.filter((items) => items.level == 3).length}</p>
                    <p style={{ fontSize: 18, fontWeight: 400 }}>Level 3</p>
                </div>
                <div className='tk-gradient-each'>
                    <p style={{ fontSize: 20, fontWeight: 600 }}>{project.listEmployee.length}</p>
                    <p style={{ fontSize: 18, fontWeight: 400 }}>Thành viên</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '40%', marginLeft: '10%' }}>
                    <div>
                        <h1>Thống kê theo nhãn</h1>
                        <div style={{ width: 400, height: 400, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                            <Chart data={tk} label={tk_nhan} />
                        </div>
                    </div>
                </div>
                {/* <div style={{ width: '40%', marginLeft: '10%' }}>
                    <div>
                        <h1>Thống kê theo level {id}</h1>
                        <div style={{ width: 400, height: 400, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                            <Chart data={tk_employees} label={['Cấp 1', 'Cấp 2', 'Cấp 3', 'Cấp 4']} />
                        </div>
                    </div>
                </div> */}
                <div style={{ width: '40%', marginLeft: '5%' }}>
                    <h1>Tỉ lệ hoàn thành</h1>
                    <div style={{ width: 400, height: 400, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <Chart data={[3, 5]} label={['Hoàn thành', 'Chưa hoàn thành']} />
                    </div>
                </div>
            </div>
            {project.type.type == 1 && (<div style={{ display: 'flex', flexDirection: 'row', marginTop: 50 }}>
                <div style={{ width: '40%', marginLeft: '10%' }}>
                    <div>
                        <h1>Thống kê theo nhãn</h1>
                        <div style={{ width: 400, height: 400, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                            <Chart data={[6, 9, 12]} label={['Vui', 'Buồn', 'Không cảm xúc']} />
                        </div>
                    </div>
                </div>
            </div>)}
            <h2 style={{ margin: 20, marginTop: 60 }}>Thống kê theo người gán nhãn</h2>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '50%' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Đã hoàn thành</h2>
                    {
                        project.listEmployee.filter((items) => items.status === 'Active').map((item, index) => (
                            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                                <p style={{ color: item.status == 0 ? 'black' : 'green', marginRight: 20 }}>
                                    {item.id} - {item.name} - Cấp: {item.level}
                                </p>
                                {item.status !== 0 ? (<AiFillCheckCircle size={18} color='green' style={{ marginTop: 5 }} />) : (<div></div>)}

                                <a style={{ color: 'blue', marginLeft: 20, marginRight: 30 }}>
                                    Điều chỉnh nhãn <span><AiTwotoneEdit /></span>
                                </a>
                                {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <p style={{ color: 'red' }}>Xoá khỏi dự án</p>
                                    <AiFillCloseCircle size={18} color='red' style={{ marginTop: 5, marginLeft: 10 }} />
                                </div> */}
                            </div>
                        ))
                    }
                </div>
                <div style={{ width: '50%' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Chưa hoàn thành</h2>
                    {
                        project.listEmployee.filter((items) => items.status === 'Inactive').map((item, index) => (
                            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                                <p style={{ color: item.status == 0 ? 'black' : 'green', marginRight: 20 }}>
                                    {item.id} - {item.name} - Cấp: {item.level}
                                </p>
                                {item.status !== 0 ? (<AiFillCheckCircle size={18} color='green' style={{ marginTop: 5 }} />) : (<div></div>)}

                                <a style={{ color: 'blue', marginLeft: 20, marginRight: 30 }}>
                                    Điều chỉnh nhãn <span><AiTwotoneEdit /></span>
                                </a>
                                {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <p style={{ color: 'red' }}>Xoá khỏi dự án</p>
                                    <AiFillCloseCircle size={18} color='red' style={{ marginTop: 5, marginLeft: 10 }} />
                                </div> */}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default memo(App);
