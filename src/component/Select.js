import React, { useState } from 'react';
import { Radio, Select, Space } from 'antd';
const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};
const App = ({ array }) => {
    const [size, setSize] = useState('middle');
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };
    return (
        <>
            <Space
                direction="vertical"
                style={{
                    width: '100%',
                }}
            >
                <Select
                    size={size}
                    defaultValue={array[0].label}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                    }}
                    options={array}
                />

            </Space>
        </>
    );
};
export default App;