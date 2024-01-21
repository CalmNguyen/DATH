import { useState, useEffect, memo, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../css/style.css'
import '../style/bootstrap.css'
import '../style/bootstrap.min.css'
import { AiFillCloseCircle, AiFillCheckCircle, AiTwotoneEdit } from "react-icons/ai";
import { IconName } from "react-icons/fa";
import ReadFileAll from './ReadFileAll'
import ModalEmployees from '../component_read/ModalEmployees';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';
import { Button } from 'reactstrap';
import { auth } from '../auth';
import Header from '../header'
function Import_data({ project }) {
    const [type, set_type] = useState(project && project.length > 0 ? project.type.type : "Type 1")
    const [csvData, setCSVData] = useState([]);
    const [open_detail, set_open_detail] = useState(false)
    const [nameData, set_nameData] = useState('')
    const navigate = useNavigate()
    const createData = async () => {
        const data_post = {
            name: nameData,
            dataSequence: csvData,
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/api/add-data-list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data_post),
            });

            if (response.status == 200) {
                alert("Thêm thành công")
                // navigate('/ds-du-an')
                // const jsonData = await response.json();
                // console.log(jsonData);
                // Xử lý thành công
            } else {
                // Xử lý lỗi
                throw new Error("Error: " + response.status);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };
    return (
        <div>
            <Header />
            <h1 style={{ paddingLeft: 10 }}>
                Import dữ liệu
            </h1>
            <form style={{ margin: 20 }}>
                <div class="form-group" style={{ width: '85%' }}>
                    <label for="exampleFormControlInput1">Tên dữ liệu</label>
                    <input onChange={(event) => set_nameData(event.target.value)} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Gán nhãn phân loại thông tin"></input>
                </div>
                <div className='form-group' style={{ marginTop: 10 }}>
                    Chọn file
                    <ReadFileAll type={type} open_detail={open_detail} set_open_detail={set_open_detail}
                        csvData={csvData} setCSVData={setCSVData} />
                </div>
                {csvData.length !== 0 && (<div style={{ marginTop: 10 }}>
                    <button style={{ borderWidth: 0.5 }} type="button" onClick={() => set_open_detail(true)}>Xem chi tiết</button>
                </div>)}
                <div className='form-group' style={{ marginTop: 50, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button color='primary' onClick={() => createData()}
                        className='button-qltk' type='button' style={{ width: '20%', padding: 5, fontSize: 18, borderRadius: 10, marginRight: 30 }}>
                        Gửi
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default memo(Import_data);
