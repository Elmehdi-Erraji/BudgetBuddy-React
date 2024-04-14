import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Create from './components/Create';

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
                <h1 className='mt-3'>Budget buddy</h1>
                <Routes>
                    <Route path='/' element={<Homepage depenses={depenses} />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/Create' element={<Create />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;