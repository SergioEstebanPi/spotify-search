import { Alert } from 'antd';
import React from 'react';

const ErrorComponent = ({ message }) => (
    <Alert message={message} type="error" />
);

export default ErrorComponent;