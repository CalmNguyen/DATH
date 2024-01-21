import React, { useState } from 'react';
import Papa from 'papaparse';
import Modal from 'react-modal';
import { CSVLink } from 'react-csv';
import { AiFillCloseCircle, AiFillPlusCircle, AiFillCheckCircle, AiTwotoneEdit } from "react-icons/ai";

function CSVReader({ open_detail, set_open_detail, csvData, setCSVData, turnOffChoseFile, open_download_csv }) {
    const [nhan, set_nhan] = useState('1')
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return
        }
        if (file.name.endsWith('.json')) {
            // alert('sdks')
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                // console.log('in1')
                // console.log(JSON.parse(content));
                // console.log('in2')
                let list_data_json = JSON.parse(content)
                setCSVData(list_data_json && list_data_json.data ? list_data_json.data : [])
            };
            reader.readAsText(file);
            set_open_detail(true)
            return
        }
        if (!file.name.endsWith('.csv')) {
            alert('Chỉ nhận file CSV từ import');
            return;
        }
        Papa.parse(file,
            {
                encoding: "utf8",
                complete: function (results) {
                    setCSVData(results.data);
                    console.log(results.data)
                    // const a = results.data[1];
                    // console.log('in', a); // Kiểm tra dữ liệu trước khi sử dụng split
                    // const splitData = a[0].split(',');
                    // for (let i = 0; i < results.data.length; i++) {
                    //     console.log(results.data[i])
                    // }
                    // alert(splitData); // Kiểm tra kết quả sau khi sử dụng split
                    set_open_detail(true)

                }
            });
    };
    const [type, set_type] = useState('Type 2')
    const [addData, set_addData] = useState([])
    const [cot2, set_cot2] = useState("")
    const [cot3, set_cot3] = useState("")
    const [vi_tri, set_vi_tri] = useState(0)
    const [them_dong, set_them_dong] = useState(false)
    const [edit_cot2, set_edit_cot2] = useState("")
    const [edit_cot3, set_edit_cot3] = useState("")
    const [edit_dong, set_edit_dong] = useState(false)
    const [vi_tri_edit, set_vi_tri_edit] = useState(0)
    const [vi_tri_edit_new, set_vi_tri_edit_new] = useState(0)
    return (
        <div>
            {!turnOffChoseFile && (<input type="file" onChange={handleFileUpload} style={{ width: '50%' }} />)}

            <Modal isOpen={open_detail} onRequestClose={() => set_open_detail(false)}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10, width: '50%', alignItems: 'center' }}>
                        <span> <AiFillPlusCircle size={22} color='#3BB9FF' onClick={() => set_them_dong(true)} />  Thêm dòng</span>
                        {csvData.length > 0 && (
                            <CSVLink data={csvData} filename="data.csv" style={{ marginLeft: 30 }}>
                                Download CSV
                            </CSVLink>
                        )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10, width: '50%' }}>
                        <AiFillCloseCircle size={22} color='red' onClick={() => set_open_detail(false)} />
                    </div>
                </div>
                {them_dong && (<div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div class="form-group" style={{ width: (type == "Type 2" || type == "Type 5" || type == "Type 6") ? '40%' : '85%' }}>
                        <label for="exampleFormControlInput1">Cột 2</label>
                        <input type="text" class="form-control" value={cot2} onChange={(event) => set_cot2(event.target.value)} id="exampleFormControlInput1" placeholder="Nhập cột 2"></input>
                    </div>
                    {(type == "Type 2" || type == "Type 5" || type == "Type 6") &&
                        (<div class="form-group" style={{ width: '40%', marginLeft: '5%' }}>
                            <label for="exampleFormControlInput1">Cột 3</label>
                            <input type="text" class="form-control" value={cot3} onChange={(event) => set_cot3(event.target.value)} id="exampleFormControlInput1" placeholder="Nhập cột 3"></input>
                        </div>
                        )}
                    <div className='form-group' style={{ display: 'flex', flexDirection: 'row', marginTop: 10, width: '10%', marginLeft: 20 }}>
                        <button onClick={() => {
                            set_them_dong(false)
                        }} className='button-qltk' type='button' style={{ width: '50%', marginLeft: '2%', justifyContent: 'center', alignItems: 'center', borderWidth: 0, backgroundColor: 'white' }}><AiFillCloseCircle color='red' size={25} /></button>
                        <button onClick={() => {
                            // if (nhan !== "" && listData.filter((items) => items === nhan).length === 0) {
                            //     const updatedListData = [...listData, nhan];
                            //     set_listData(updatedListData);
                            // }
                            // else {
                            //     alert("Nhãn trùng lặp hoặc nhãn rỗng")
                            // }
                            // console.log(addData)
                            const temp = [...csvData]
                            temp.push([cot2, cot3])
                            // alert(cot2, cot3)
                            setCSVData(temp)
                            // alert('Đã lưu')
                        }} className='button-qltk' type='button' style={{ width: '50%', marginLeft: '2%', justifyContent: 'center', alignItems: 'center', borderWidth: 0, backgroundColor: 'white' }}><AiFillCheckCircle color='#52D017' size={25} /></button>
                    </div>
                </div>)}
                <div className='form-group' style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    <div style={{ width: '20%', display: 'flex', flexDirection: 'row', border: '1px solid #736F6E', alignItems: 'center', borderRadius: 5, flexWrap: 'wrap' }}>
                        <input style={{ textAlign: 'center' }} type="number" value={vi_tri_edit} onChange={(event) => set_vi_tri_edit(event.target.value)} class="form-control" id="exampleFormControlInput1" placeholder="Gán nhãn phân loại thông tin"></input>
                    </div>
                    <button onClick={() => {
                        if (vi_tri_edit < 0 || vi_tri_edit >= csvData.length) {
                            alert('Vị trí không tồn tại')
                            return
                        }
                        const temp = csvData[vi_tri_edit]
                        set_edit_cot2(temp ? temp[0] : '')
                        set_edit_cot3(temp ? temp[1] : '')
                        set_vi_tri_edit_new(vi_tri_edit)
                        set_edit_dong(true)
                    }} className='button-qltk' type='button' style={{ width: 80, marginLeft: '2%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, backgroundColor: '#56A5EC', borderRadius: 10, color: 'white' }}>Edit</button>

                </div>
                {edit_dong && vi_tri_edit >= 0 && vi_tri_edit < csvData.length && (<div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div class="form-group" style={{ width: (type == "Type 2" || type == "Type 5" || type == "Type 6") ? '40%' : '85%' }}>
                        <label for="exampleFormControlInput1">Cột 2 - Dòng {vi_tri_edit_new}</label>
                        <textarea rows="5" style={{ overflow: 'auto', wordBreak: 'break-all', wordWrap: 'break-word' }} type="text" class="form-control" value={edit_cot2} onChange={(event) => set_edit_cot2(event.target.value)} id="exampleFormControlInput1" placeholder="Nhập cột 2"></textarea>
                    </div>
                    {(type == "Type 2" || type == "Type 5" || type == "Type 6") &&
                        (<div class="form-group" style={{ width: '40%', marginLeft: '5%' }}>
                            <label for="exampleFormControlInput1">Cột 3 - Dòng {vi_tri_edit_new}</label>
                            <textarea rows={1} type="text" class="form-control" value={edit_cot3} onChange={(event) => set_edit_cot3(event.target.value)} id="exampleFormControlInput1" placeholder="Nhập cột 3"></textarea>
                        </div>
                        )}
                    <div className='form-group' style={{ display: 'flex', flexDirection: 'row', marginTop: 10, width: '10%', marginLeft: 20 }}>
                        <button onClick={() => {
                            set_edit_dong(false)
                        }} className='button-qltk' type='button' style={{ width: '50%', marginLeft: '2%', justifyContent: 'center', alignItems: 'center', borderWidth: 0, backgroundColor: 'white' }}><AiFillCloseCircle color='red' size={25} /></button>
                        <button onClick={() => {
                            // if (nhan !== "" && listData.filter((items) => items === nhan).length === 0) {
                            //     const updatedListData = [...listData, nhan];
                            //     set_listData(updatedListData);
                            // }
                            // else {
                            //     alert("Nhãn trùng lặp hoặc nhãn rỗng")
                            // }
                            // console.log(addData)
                            if (vi_tri_edit < 0 || vi_tri_edit >= csvData.length) {
                                alert('Vị trí không tồn tại')
                                return
                            }
                            let temp = [...csvData]
                            temp[vi_tri_edit][0] = edit_cot2
                            temp[vi_tri_edit][1] = edit_cot3
                            // alert(cot2, cot3)
                            setCSVData(temp)
                            alert('Đã lưu')
                            // alert('Đã lưu')
                        }} className='button-qltk' type='button' style={{ width: '50%', marginLeft: '2%', justifyContent: 'center', alignItems: 'center', borderWidth: 0, backgroundColor: 'white' }}><AiFillCheckCircle color='#52D017' size={25} /></button>
                    </div>
                </div>)}

                <div className='form-group' style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    <div style={{ width: '20%', display: 'flex', flexDirection: 'row', border: '1px solid #736F6E', alignItems: 'center', borderRadius: 5, flexWrap: 'wrap' }}>
                        <input style={{ textAlign: 'center' }} type="number" value={vi_tri} onChange={(event) => set_vi_tri(event.target.value)} class="form-control" id="exampleFormControlInput1" placeholder="Gán nhãn phân loại thông tin"></input>
                    </div>
                    <button onClick={() => {
                        let temp = [...csvData]
                        if (vi_tri + 1 >= temp.length) {
                            alert('Vị trí không tồn tại')
                            return
                        }
                        // console.log(temp.length)
                        temp.splice(vi_tri + 1, 1)
                        // console.log(temp.splice(vi_tri, vi_tri).length)
                        setCSVData(temp)
                    }} className='button-qltk' type='button' style={{ width: 80, marginLeft: '2%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, backgroundColor: '#F62217', borderRadius: 10, color: 'white' }}>Delete</button>

                </div>
                <table charset="utf-8" style={{ border: '1px solid #736F6E', marginTop: 20 }}>
                    <thead style={{ border: '1px solid #736F6E' }}>
                        {csvData[0] && (
                            <tr style={{ border: '1px solid #736F6E', }}>
                                <th style={{ border: '1px solid #736F6E', width: 30, textAlign: 'center' }} >STT</th>
                                <th style={{ border: '1px solid #736F6E', width: (type == "Type 2" || type == "Type 5" || type == "Type 6") ? '40%' : '90%' }} >{csvData[0][0]}</th>
                                {(type == "Type 2" || type == "Type 5" || type == "Type 6") && (<th style={{ border: '1px solid #736F6E', width: '40%' }} >{csvData[0][1]}</th>)}
                            </tr>
                        )}

                    </thead>
                    <tbody>
                        {/* {addData.slice(1).map((row, rowIndex) => (
                            <tr style={{ border: '1px solid #736F6E' }} key={rowIndex}>
                                <td style={{ border: '1px solid #736F6E', width: 30, textAlign: 'center' }}>{rowIndex}</td>
                                <td style={{ border: '1px solid #736F6E', width: (type == "2" || type == "5" || type == "6") ? '40%' : '90%' }}>{row[0]}</td>
                                {(type == "2" || type == "5" || type == "6") && (<td style={{ border: '1px solid #736F6E', width: '40%' }}>{row[1]}</td>)}
                            </tr>
                        ))} */}
                        {csvData.slice(1).map((row, rowIndex) => (
                            <tr style={{ border: '1px solid #736F6E' }} key={rowIndex}>
                                <td style={{ border: '1px solid #736F6E', width: 30, textAlign: 'center' }}>{rowIndex + 1}</td>
                                <td style={{ border: '1px solid #736F6E', width: (type == "Type 2" || type == "Type 5" || type == "Type 6") ? '40%' : '90%' }}>{row[0]}</td>
                                {(type == "Type 2" || type == "Type 5" || type == "Type 6") && (<td style={{ border: '1px solid #736F6E', width: '40%' }}>{row[1]}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button style={{ marginTop: 20 }} onClick={() => set_open_detail(false)}>Đóng</button>
            </Modal>
        </div>
    );
}

export default CSVReader;
