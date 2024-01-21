import React, { useRef, useState } from 'react';
import './CauNoiHay.css'; // Import file CSS để định dạng giao diện

const CauNoiHay = () => {
    const s = "Xin chào các bạn xuống dòng nè \n Bây giờ sẽ công chiếu"
    const sentense = s.split(' ')
    const [message, setMessage] = useState('');

    const a = useRef('')
    const handleClick = () => {
        let j = 0
        let temp = ""
        for (let i of sentense) {
            setMessage("")
            setTimeout(async () => {
                await setMessage(temp => temp + i + " ");
            }, 200 * j);
            j++
            temp = message
        }
        // setTimeout(() => {
        //     setMessage(message => message + ' rồi');
        //     setTimeout(() => {
        //         setMessage(message => message + ' chào');
        //     }, 10);
        // }, 10);
    };

    const splitSentence = () => {
        const words = message.split(' ');
        return words.map((word, index) => <span key={index}>{word}&nbsp;</span>);
    };

    return (
        <div className="container"> {/* Đặt className container để tùy chỉnh giao diện */}
            <h1 className="centered-text">{message}</h1> {/* Đặt className centered-text để căn giữa chữ */}
            <button onClick={handleClick}>Chạm để chào</button>
        </div>
    );
};

export default CauNoiHay;
