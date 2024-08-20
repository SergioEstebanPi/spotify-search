import React from 'react';
import { Button } from 'antd';
import { BASEURL } from '../constants/constants';
import './Login.css';
import Title from 'antd/es/typography/Title';

const Login = () => (
    <>
        <Title level={3} style={{ 
            color: 'black',
        }}>
            Get login to start searching...
        </Title>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
            <Button 
                type="default" 
                className="custom-login-button" 
                href={(process.env.REACT_APP_API_URL || BASEURL) + "oauth2/authorization/spotify"}
            >
                Login with Spotify
            </Button>
        </div>
    </>
);

export default Login;
