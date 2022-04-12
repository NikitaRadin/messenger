import React from 'react';
import apiClient from '../apiClient';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Messenger from './Messenger';
import Login from './Login';
import Register from './Register';
import PageNotFound from './PageNotFound';

function Router(props) {
    const [userStatus, setUserStatus] = React.useState('Unknown');

    React.useEffect(() => {
        apiClient.get('profile/')
            .then(response => {
                setUserStatus('Authenticated');
            })
            .catch(error => {
                setUserStatus('Anonymous');
            });
    });

    function authenticate(token) {
        localStorage.setItem('token', token);
        setUserStatus('Authenticated');
    };

    return (
        userStatus !== 'Unknown' ?
            <BrowserRouter>
                <Routes>
                    <Route path="/messenger" element={userStatus === 'Authenticated' ? <Messenger /> : <Navigate to='/login' />} />
                    <Route path="/login" element={userStatus === 'Anonymous' ? <Login authenticate={authenticate} /> : <Navigate to='/messenger' />} />
                    <Route path="/register" element={userStatus === 'Anonymous' ? <Register authenticate={authenticate} /> : <Navigate to='/messenger' />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter> :
            <></>
    );
};

export default Router;
