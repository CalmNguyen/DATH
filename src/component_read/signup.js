import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../img/image_background_register.jpg'
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };
    const handleFullnameChange = (e) => {
        set_fullname(e.target.value);
    };
    const [fullname, set_fullname] = useState("")
    const handleSignUp = () => {
        // Gọi API để tạo tài khoản
        fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                type: type,
                name: name,
                fullname: fullname
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === 1) {
                    // Tạo tài khoản thành công, điều hướng tới trang đăng nhập
                    alert("Tạo tài khoản thành công")
                    navigate('/');
                } else {
                    // Hiển thị thông báo lỗi
                    alert(data.message);
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };

    return (
        <div style={{ backgroundImage: `url(${image})` }}>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <h1 style={{ textAlign: 'center', padding: 10, color: 'white' }}>Sign Up</h1>
                <MDBInput wrapperClass='mb-2' labelStyle={{ color: 'white' }} placeholder='Ex: a@gmail.com' label='Email address' id='form1' type='email' value={email} onChange={handleEmailChange} />
                <MDBInput wrapperClass='mb-2' labelStyle={{ color: 'white' }} placeholder="" label='Password' id='form2' type='password' value={password} onChange={handlePasswordChange} />
                <MDBInput wrapperClass='mb-2' labelStyle={{ color: 'white' }} placeholder="Ex: A" label='Name' id='form3' type='text' value={name} onChange={handleNameChange} />
                <MDBInput wrapperClass='mb-2' labelStyle={{ color: 'white' }} placeholder="Ex: employee" label='Type' id='form4' type='text' value={type} onChange={handleTypeChange} />
                <MDBInput wrapperClass='mb-2' labelStyle={{ color: 'white' }} placeholder="Ex: Nguyễn Văn A" label='Fullname' id='form5' type='text' value={fullname} onChange={handleFullnameChange} />
                {/* <div className="d-flex justify-content-between mx-3 mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="!#">Forgot password?</a>
                </div> */}

                <MDBBtn className="mb-2" onClick={handleSignUp}>Sign Up</MDBBtn>

                <div className="text-center">
                    <p style={{ color: 'white' }}>Already have an account? <a href="/">Login</a></p>
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
        </div>
    );
}

export default SignUpForm;
