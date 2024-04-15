import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Create from './components/Create';
import Edit from './components/Edit';

function App() {
    const [depenses, setDepenses] = useState([]);

    useEffect(() => {
        async function fetchDepenses() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('User token not found');
                }
                
                const response = await axios.get('http://127.0.0.1:8000/api/depenses', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDepenses(response.data.depenses);
                console.log(response.data.depenses);
            } catch (error) {
                console.error('Error fetching depenses:', error);
            }
        }

        fetchDepenses();
    }, []);

    return (
        <BrowserRouter>
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Homepage depenses={depenses} />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/Create' element={<Create />} />
                    <Route path='/register' element={<Register />} />
                    <Route path="/expenses/:id/edit" element={<Edit />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
