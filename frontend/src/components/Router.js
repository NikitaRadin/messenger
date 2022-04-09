import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Messenger from './Messenger';
import Login from './Login';
import Register from './Register';

function Router(props) {
    const [token, setToken] = React.useState('');

    React.useEffect(() => {
        var token = localStorage.getItem('token');
        setToken(token);
    });

    function saveToken(token) {
        setToken(token);
        localStorage.setItem('token', token);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/messenger" element={token ? <Messenger /> : <Navigate to='/login' />} />
                <Route path="/login" element={!token ? <Login saveToken={saveToken} /> : <Navigate to='/messenger' />} />
                <Route path="/register" element={!token ? <Register saveToken={saveToken} /> : <Navigate to='/messenger' />} />
                {/*<Route path="*" element={</>} />*/}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
