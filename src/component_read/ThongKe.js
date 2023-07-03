import { useEffect, useState, memo } from 'react';
import '../css/style.css'
import '../style/bootstrap.css'
import '../style/bootstrap.min.css'
import { AiFillCloseCircle, AiFillCheckCircle, AiTwotoneEdit } from "react-icons/ai";
import { IconName } from "react-icons/fa";

function ThongKe() {
    const [type, set_type] = useState("1")
    const [open_chon_nhan, set_open_chon_nhan] = useState(false)
    const [listData, set_listData] = useState(['Vui', 'Buồn', 'Không cảm xúc'])
    const [thong_ke, set_thong_ke] = useState([3, 2, 5])
    const [listDataEmployeesSelected, set_listDataEmployeesSelected] = useState([])
    const [open_them_nhan, set_open_them_nhan] = useState(false)
    const [nhan, set_nhan] = useState("")
    const [csvData, setCSVData] = useState([]);
    const [open_detail, set_open_detail] = useState(false)
    const [open_modal_employees, set_open_modal_employees] = useState(false)
    const [employees, set_employees] = useState(
        [])
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
    return (
        <div>
            <div>
                <h2 style={{ marginLeft: 20 }}>Thống kê theo nhãn</h2>
                <table charset="utf-8" style={{ border: '1px solid #736F6E', margin: 20 }}>
                    <thead style={{ border: '1px solid #736F6E' }}>
                        <tr style={{ border: '1px solid #736F6E' }}>
                            {
                                listData.map((item) => (
                                    <th style={{ border: '1px solid #736F6E', width: String(listData.length / 100) + '%', padding: 10 }}>{item}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ border: '1px solid #736F6E' }}>
                            {thong_ke.map((row, rowIndex) => (
                                <td style={{ border: '1px solid #736F6E', padding: 10 }}>{row}</td>
                            ))}
                        </tr>
                    </tbody>
                    <thead style={{ border: '1px solid #736F6E' }}>
                        <tr style={{ border: '1px solid #736F6E' }}>
                            {
                                ['Cấp 1', 'Cấp 2', 'Cấp 3', 'Cấp 4'].map((item) => (
                                    <th style={{ border: '1px solid #736F6E', width: String(4 / 100) + '%', padding: 10 }}>{item}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ border: '1px solid #736F6E' }}>
                            {[5, 3, 7, 10].map((row, rowIndex) => (
                                <td style={{ border: '1px solid #736F6E', padding: 10 }}>{row}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <h2 style={{ marginLeft: 20 }}>Thống kê theo người gán nhãn</h2>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '50%' }}>
                        {
                            employees.filter((items) => items.status === 0).map((item, index) => (
                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                                    <p style={{ color: item.status == 0 ? 'black' : 'green', marginRight: 20 }}>
                                        {item.id} - {item.name} - Cấp: {item.level}
                                    </p>
                                    {item.status !== 0 ? (<AiFillCheckCircle size={18} color='green' style={{ marginTop: 5 }} />) : (<div></div>)}

                                    <a style={{ color: 'blue', marginLeft: 20, marginRight: 30 }}>
                                        Điều chỉnh nhãn <span><AiTwotoneEdit /></span>
                                    </a>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <p style={{ color: 'red' }}>Xoá khỏi dự án</p>
                                        <AiFillCloseCircle size={18} color='red' style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div style={{ width: '50%' }}>
                        {
                            employees.filter((items) => items.status === 1).map((item, index) => (
                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                                    <p style={{ color: item.status == 0 ? 'black' : 'green', marginRight: 20 }}>
                                        {item.id} - {item.name} - Cấp: {item.level}
                                    </p>
                                    {item.status !== 0 ? (<AiFillCheckCircle size={18} color='green' style={{ marginTop: 5 }} />) : (<div></div>)}

                                    <a style={{ color: 'blue', marginLeft: 20, marginRight: 30 }}>
                                        Điều chỉnh nhãn <span><AiTwotoneEdit /></span>
                                    </a>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <p style={{ color: 'red' }}>Xoá khỏi dự án</p>
                                        <AiFillCloseCircle size={18} color='red' style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(ThongKe);
