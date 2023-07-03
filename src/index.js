import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import QuanLyTaiKhoan from './component_read/QuanLyTaiKhoan';
// import ThongKe from './ThongKe';
import Bieudotron from './component_product/bieudotron'
import List_Project from './component_product/List_Project';
import EditProject from './component_product/EditProject';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/about/1">Thống kê</Link>
            </li>
            {/* <li>
              <Link to="/about-detail">Thống kê chi tiết</Link>
            </li> */}
            <li>
              <Link to="/ds-du-an">Danh sách project</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<QuanLyTaiKhoan />} />
          <Route path="/about/:id" element={<Bieudotron />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path='/ds-du-an' element={<List_Project />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
