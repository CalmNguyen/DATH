import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Header = () => {
    const menu = (
        <Menu>
            <Menu.Item key="1">
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item key="2">
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            </Menu.Item>
            <Menu.Item key="3">
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', alignItems: 'center' }}>
            <div>
                {/* Đặt logo của bạn tại đây */}
                <img src="/path/to/your/logo.png" alt="Logo" style={{ width: '50px', marginRight: '16px' }} />
            </div>
            <div>
                {/* Menu Dropdown */}
                <Dropdown overlay={menu} placement="bottomRight">
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        Chuyển chữ sang tiếng nói <DownOutlined />
                    </a>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;
