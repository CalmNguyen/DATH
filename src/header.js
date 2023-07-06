import { useState, useEffect, memo, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
export default function header() {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/home">Tạo project</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/bieu-do/10">Thống kê</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/ds-du-an">Danh sách project</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/upgrade-user">Điều chỉnh level</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/">Đăng xuất</Link>
                </li>
            </ul>
        </nav>
    )
}