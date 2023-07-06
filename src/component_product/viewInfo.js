import { useState, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import '../App.css';
import '../css/style.css'
import '../style/bootstrap.css'
import '../style/bootstrap.min.css'
import { AiFillCloseCircle, AiFillCheckCircle, AiTwotoneEdit } from "react-icons/ai";
import { IconName } from "react-icons/fa";
import ReadFile from '../component_read/ReadFile'
import ModalEmployees from '../component_read/ModalEmployees';

function EditProject({ project }) {
    const { id } = useParams();
    const [type, set_type] = useState(project && project.length > 0 ? project.type.type : "1")
    const [open_chon_nhan, set_open_chon_nhan] = useState(false)
    const [listData, set_listData] = useState(project && project.length > 0 ? project.type.listNhan : [])
    const [thong_ke, set_thong_ke] = useState([3, 2, 5])
    const [listDataEmployeesSelected, set_listDataEmployeesSelected] = useState(project && project.length > 0 ? project.listEmployee : [])
    const [open_them_nhan, set_open_them_nhan] = useState(false)
    const [nhan, set_nhan] = useState("")
    const [csvData, setCSVData] = useState([]);
    const [open_detail, set_open_detail] = useState(false)
    const [open_modal_employees, set_open_modal_employees] = useState(false)
    const [employees, set_employees] = useState([])
    const [data, set_data] = useState([])
    const [nameProject, set_nameProject] = useState('')
    const [language, set_language] = useState({
        "input": "",
        "output": ""
    })
    useEffect(() => {
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
                    set_employees(actualData.data)
                }
                else {
                    alert(actualData.message)
                }
            });
    }, [])
    useEffect(() => {
        fetch('http://127.0.0.1:5000/projectn/' + String(id), {
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
                    set_nameProject(data.nameProject)
                    set_type(data.type.type)
                    set_language(data.type.language)
                    set_listDataEmployeesSelected(data.listEmployee)
                    setCSVData(data.dataSequence)
                }
                else {
                    alert(actualData.message)
                }
            });
    }, [])
    const editProject = async () => {
        const data_post = {
            nameProject: nameProject,
            type: {
                type: type,
                listNhan: listData,
                language: language,
            },
            listEmployee: listDataEmployeesSelected,
            time: new Date(),
            timeEnd: "",
            dataSequence: csvData,
            maxEmployees: "30",
            status: 0,
            adminID: 1,
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/api/edit-project/" + id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data_post),
            });
            console.log(response)
            if (response.result == '1') {
                const jsonData = await response.json();
                console.log(jsonData);
                alert("Thành công")
                // Xử lý thành công
            } else {
                // Xử lý lỗi
                // throw new Error("Error: " + response.status);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div>
            <h1 style={{ paddingLeft: 10 }}>
                Chi tiết dự án
            </h1>
            {/* <button onClick={() => setCSVData(csvData)}>Export CSV</button>
            {csvData.length > 0 && (
                <CSVLink data={csvData} filename="data.csv">
                    Download CSV
                </CSVLink>
            )} */}
            <form style={{ margin: 20 }}>
                <div class="form-group" style={{ width: '85%' }}>
                    <label for="exampleFormControlInput1">Tên dự án</label>
                    <input onChange={(event) => set_nameProject(event.target.value)} value={nameProject} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Gán nhãn phân loại thông tin"></input>
                </div>
                <div class="form-group" style={{ width: '85%' }}>
                    <label for="exampleFormControlInput1">Chọn loại nhãn</label>
                    <select className='form-control' value={type} onChange={(event) => {
                        set_type(event.target.value)
                    }
                    } >
                        <option value="1">Phân loại văn bản</option>
                        <option value="2">Hỏi đáp</option>
                        <option value="3">Dịch máy</option>
                        <option value="4">Gán nhãn thực thể</option>
                        <option value="5">Gán nhãn cặp văn bản đồng nghĩa</option>
                        <option value="6">Gán nhãn câu trả lời của cặp câu hỏi và văn bản</option>
                        <option value="7">Tìm câu hỏi đồng nghĩa</option>
                    </select>
                </div>
                {type == 3 && (
                    <div className="form-group" style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '42.5%' }}>
                            <label htmlFor="exampleFormControlInput1">Nhập ngôn ngữ đầu vào</label>
                            <div >
                                <input readOnly style={{ flex: 1, width: '90%' }} value={language.input} type="text" className="form-control" id="exampleFormControlInput1" placeholder="" />
                            </div>
                        </div>

                        <div style={{ width: '42.5%' }}>
                            <label htmlFor="exampleFormControlInput1">Nhập ngôn ngữ đầu ra</label>
                            <div >
                                <input readOnly style={{ flex: 1, width: '100%' }} value={language.output} type="text" className="form-control" id="exampleFormControlInput1" placeholder="" />
                            </div>
                        </div>
                    </div>
                )}
                {(type == 1 && <div className="form-group" style={{ width: '100%' }}>
                    <label htmlFor="exampleFormControlInput1">Loại nhãn</label>
                    <div className='form-group' style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '80%', display: 'flex', flexDirection: 'row', border: '1px solid #736F6E', alignItems: 'center', borderRadius: 5, flexWrap: 'wrap' }}>
                            {
                                listData.map((item) => (
                                    <div onClick={() => {
                                        const updatedListData = listData.filter((items) => items !== item);
                                        set_listData(updatedListData);
                                    }}
                                        style={{ display: 'flex', flexDirection: 'row', marginRight: 5, marginTop: 10, marginLeft: 10, }}>
                                        <p style={{ marginRight: 5 }}>{item}</p>
                                        <AiFillCloseCircle color='red' />
                                    </div>
                                ))
                            }
                        </div>
                        <button onClick={() => {
                            set_open_them_nhan(true)
                        }} className='button-qltk' type='button' style={{ width: '10%', marginLeft: '5%', justifyContent: 'center', alignItems: 'center', borderWidth: 0 }}><h3>+</h3></button>
                    </div>
                    {open_them_nhan && (<div className='form-group' style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                        <div style={{ width: '60%', display: 'flex', flexDirection: 'row', border: '1px solid #736F6E', alignItems: 'center', borderRadius: 5, flexWrap: 'wrap' }}>
                            <input readOnly type="text" value={nhan} onChange={(event) => set_nhan(event.target.value)} class="form-control" id="exampleFormControlInput1" placeholder="Gán nhãn phân loại thông tin"></input>
                        </div>
                        <button onClick={() => {
                            set_open_them_nhan(false)
                        }} className='button-qltk' type='button' style={{ width: '5%', marginLeft: '2%', justifyContent: 'center', alignItems: 'center', borderWidth: 0, backgroundColor: 'white' }}><AiFillCloseCircle color='red' size={25} /></button>
                        <button onClick={() => {
                            if (nhan !== "" && listData.filter((items) => items === nhan).length === 0) {
                                const updatedListData = [...listData, nhan];
                                set_listData(updatedListData);
                            }
                            else {
                                alert("Nhãn trùng lặp hoặc nhãn rỗng")
                            }
                        }} className='button-qltk' type='button' style={{ width: '5%', marginLeft: '2%', justifyContent: 'center', alignItems: 'center', borderWidth: 0, backgroundColor: 'white' }}><AiFillCheckCircle color='#52D017' size={25} /></button>
                    </div>)}
                </div>)}
                <div className="form-group" style={{ width: '100%' }}>
                    <label htmlFor="exampleFormControlInput1">Chọn người gán nhãn</label>
                    <div className='form-group' style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '80%', display: 'flex', flexDirection: 'row', border: '1px solid #736F6E', alignItems: 'center', borderRadius: 5, flexWrap: 'wrap' }}>
                            {
                                listDataEmployeesSelected.map((item) => (
                                    <div onClick={() => {
                                        const updatedListData = listDataEmployeesSelected.filter((items) => items.id !== item.id);
                                        set_listDataEmployeesSelected(updatedListData);
                                    }}
                                        style={{ display: 'flex', flexDirection: 'row', marginRight: 5, marginTop: 10, marginLeft: 10, }}>
                                        <p style={{ marginRight: 5 }}>{item.id} - {item.name} - level : {item.level}</p>
                                        <AiFillCloseCircle color='red' />
                                    </div>
                                ))
                            }
                        </div>
                        <ModalEmployees listDataEmployeesSelected={listDataEmployeesSelected} set_listDataEmployeesSelected={set_listDataEmployeesSelected}
                            open_modal_employees={open_modal_employees} set_open_modal_employees={set_open_modal_employees}
                            list_employees={employees} employees={employees} set_employees={set_employees} />
                        <button onClick={() => {
                            set_open_modal_employees(true)
                        }} className='button-qltk' type='button' style={{ width: '10%', marginLeft: '5%', justifyContent: 'center', alignItems: 'center', borderWidth: 0, }}><h3>+</h3></button>
                    </div>
                </div>
                <div className='form-group' style={{ marginTop: 10 }}>
                    <ReadFile open_download_csv={true} turnOffChoseFile={true} type={type} open_detail={open_detail} set_open_detail={set_open_detail}
                        csvData={csvData} setCSVData={setCSVData} />
                </div>
                {csvData.length !== 0 && (<div style={{ marginTop: 20 }}>
                    <button style={{ borderWidth: 0.5, padding: 5 }} type="button" onClick={() => set_open_detail(true)}>Xem chi tiết dữ liệu</button>
                </div>)}

            </form>
        </div>
    );
}

export default memo(EditProject);
