import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AuthProvider } from './auth'; // Import AuthProvider từ file AuthContext.js
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import QuanLyTaiKhoan from './component_read/CreateProject';
// import ThongKe from './ThongKe';
import Bieudotron from './component_product/bieudotron';
import List_Project from './component_product/List_Project';
import EditProject from './component_product/EditProject';
import ViewInfo from './component_product/viewInfo';
import Login from './component_read/login';
import Upgrade_user from './component_read/upgrade_user';
import Upgrade_detail from './component_read/upgrade_detail';
import SignUpForm from './component_read/signup';
import Import_data from './component_read/import_data';
import { auth } from './auth';
import CauNoiHay from './CauNoiHay';

import TextToVoice from './page/TextToVoice'
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));


function Route_() {
  const { isLogin, user, setUser, setIsLogin } = useContext(auth);
  return (
    <div>
      <Routes>
        {/* {isLogin && (<Route path="/home" element={<QuanLyTaiKhoan />} />)} */}
        <Route path="/" element={<TextToVoice />} />
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/signup" element={<SignUpForm />} />
        <Route path="/about/:id" element={<ViewInfo />} />
        <Route path="/bieu-do/:id" element={<Bieudotron />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
        <Route path='/ds-du-an' element={<List_Project />} />
        <Route path='/upgrade-user' element={<Upgrade_user />} />
        <Route path='/upgrade/:id' element={<Upgrade_detail />} />
        <Route path='/import' element={<Import_data />} /> */}
      </Routes>
    </div>
  )
}
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider> {/* Bọc toàn bộ ứng dụng bên trong AuthProvider */}
        <div>
          <Routes>
            <Route path="/home" element={<QuanLyTaiKhoan />} />
            <Route path="/" element={<TextToVoice />} />
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/about/:id" element={<ViewInfo />} />
            <Route path="/bieu-do/:id" element={<Bieudotron />} />
            <Route path="/edit-project/:id" element={<EditProject />} />
            <Route path='/ds-du-an' element={<List_Project />} />
            <Route path='/upgrade-user' element={<Upgrade_user />} />
            <Route path='/upgrade/:id' element={<Upgrade_detail />} />
            <Route path='/import' element={<Import_data />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
