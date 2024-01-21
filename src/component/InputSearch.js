import React from 'react';
import { Input } from 'antd';
const { Search } = Input;
const InputSearch = () => (
  <>
    <Search placeholder="input search loading default" loading={false} />
    <br />
    <br />
    <br />
    <br />
    <Search placeholder="input search text" enterButton="Search" size="large" loading />
  </>
);
export default InputSearch;