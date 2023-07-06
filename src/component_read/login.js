import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../auth';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';

function App() {
    const { isLogin, user, setUser, setIsLogin } = useContext(auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = () => {
        const url = "http://127.0.0.1:5000/login"

        const data = {
            email: email,
            password: password
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                if (result.result === 1) {
                    // Đăng nhập thành công
                    setIsLogin(true)
                    navigate('/home');
                    // Thực hiện các hành động liên quan đến đăng nhập (ví dụ: điều hướng tới trang chính)
                } else {
                    // Hiển thị thông báo lỗi
                    alert(result.message);
                }
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    };


    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <h1 style={{ textAlign: 'center', padding: 30 }}>Login</h1>
            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={handleEmailChange} />
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={handlePasswordChange} />

            <div className="d-flex justify-content-between mx-3 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4" onClick={handleSignIn}>Sign in</MDBBtn>

            <div className="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
                <p>or sign up with:</p>

                <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='facebook-f' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='twitter' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='google' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='github' size="sm" />
                    </MDBBtn>
                </div>
            </div>
        </MDBContainer>
    );
}

export default App;
