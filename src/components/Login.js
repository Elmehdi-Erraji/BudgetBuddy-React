import axios from "axios";
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";


function Login(){

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
            const { token } = response.data; // Extract token from response
            localStorage.setItem('token', token); // Store token in local storage
            console.log('Login successful:', response.data);
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return(
       
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-5 shadow" style={{ maxWidth: '1000px' }}>
          <h1 className="text-center mb-4">Login</h1>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label fs-4">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fs-4">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="text-center">
              <button className="btn btn-primary btn-lg" type="submit" style={{ fontSize: '2rem' }}>Login</button>
            </div>
          </form>
        </div>
      </div>
      
      

    )

}
export default Login;