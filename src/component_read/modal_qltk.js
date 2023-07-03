import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Thiết lập phần tử gốc của ứng dụng

const MyComponent = ({ showModal, setShowModal }) => {
    const listData = [
        { id: 1, "list": ['nhan1', 'nhan2', 'nhan3'] },
        { id: 2, "list": ['nhan1', 'nhan2', 'nhan3'] },
        { id: 3, "list": ['nhan1', 'nhan2', 'nhan3'] },
    ];
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
            <button onClick={toggleModal}>Open Modal</button>

            <Modal

                isOpen={showModal} onRequestClose={toggleModal}>

                <h2>Chọn danh sách nhãn</h2>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 100 }}>
                        <h1>My List</h1>
                        {listData.map((item) => (
                            <div style={{ width: 100 }} key={item.id}>
                                <h2>Item {item.id}</h2>
                                {item.list.map((listItem, index) => (
                                    <p key={index}>{listItem}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={toggleModal}>Đóng</button>
            </Modal>
        </div>
    );
};

export default MyComponent;
