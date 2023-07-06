import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AuthProvider } from './auth'; // Import AuthProvider từ file AuthContext.js
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import QuanLyTaiKhoan from './component_read/QuanLyTaiKhoan';
// import ThongKe from './ThongKe';
import Bieudotron from './component_product/bieudotron';
import List_Project from './component_product/List_Project';
import EditProject from './component_product/EditProject';
import ViewInfo from './component_product/viewInfo';
import Login from './component_read/login';
import Upgrade_user from './component_read/upgrade_user';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider> {/* Bọc toàn bộ ứng dụng bên trong AuthProvider */}
        <div>
          <Routes>
            <Route path="/home" element={<QuanLyTaiKhoan />} />
            <Route path="/" element={<Login />} />
            <Route path="/about/:id" element={<ViewInfo />} />
            <Route path="/bieu-do/:id" element={<Bieudotron />} />
            <Route path="/edit-project/:id" element={<EditProject />} />
            <Route path='/ds-du-an' element={<List_Project />} />
            <Route path='/upgrade-user' element={<Upgrade_user />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
