import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Messenger from './Messenger';
import Login from './Login';

function Router(props) {
    const [token, setToken] = React.useState('');

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/messenger" element={token ? <Messenger /> : <Navigate to='/login' />} />
                <Route path="/login" element={!token ? <Login /> : <Navigate to='/messenger' />} />
                {/*<Route path="*" element={</>} />*/}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
