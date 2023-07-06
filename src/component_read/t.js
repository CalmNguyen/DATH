import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiFillCloseCircle } from "react-icons/ai";

Modal.setAppElement('#root'); // Thiết lập phần tử gốc của ứng dụng

const ModalEmployees = ({ open_modal_employees, set_open_modal_employees, list_employees, employees, set_employees
    , listDataEmployeesSelected, set_listDataEmployeesSelected }) => {
    const listData = [
        { id: 1, "list": ['nhan1', 'nhan2', 'nhan3'] },
        { id: 2, "list": ['nhan1', 'nhan2', 'nhan3'] },
        { id: 3, "list": ['nhan1', 'nhan2', 'nhan3'] },
    ];
    const toggleModal = () => {
        set_open_modal_employees(!open_modal_employees);
    };

    return (
        <div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <div>
                    <div style={{ width: '100%', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ width: '95%' }}>My List</h3>
                                <AiFillCloseCircle onClick={() => set_open_modal_employees(false)} color='red' size={22} />
                            </div>
                            {list_employees.map((item) => (
                                <a style={{ width: 300 }} key={item.id}
                                    onClick={() => {
                                        if (listDataEmployeesSelected.filter((items) => items.id == item.id).length == 0) {
                                            const updatedListData = [...listDataEmployeesSelected, item];
                                            set_listDataEmployeesSelected(updatedListData);
                                        }
                                        else {
                                            const updatedListData = listDataEmployeesSelected.filter((items) => items.id !== item.id)
                                            set_listDataEmployeesSelected(updatedListData);
                                        }
                                    }}
                                >
                                    <p style={{ color: listDataEmployeesSelected.filter((items) => items.id == item.id).length == 0 ? 'black' : '#4CC417' }}>[{item.id}] - [{item.name}] - Cấp {item.level}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ModalEmployees;
