import axios from "axios";
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Link } from 'react-router-dom'; // Import Link for routing

function Register() {
    const [formData, setFormData] = useState({
        name: '',        // Name field initialized
        email: '',
        password: '',
        confirmPassword: '' // Additional field for confirming password
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
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const { name, email, password } = formData;
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password
            });
            alert('Registration successful, please log in.');
            navigate('/login'); 
        } catch (error) {
            alert('Registration failed: ' + error);
        }
    };

    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5 shadow border-primary" style={{ maxWidth: '1200px' }}>
        <h1 className="text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-12">
            <label htmlFor="name" className="form-label fs-4">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control form-control-lg"
              placeholder="Enter your name"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="email" className="form-label fs-4">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control form-control-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="password" className="form-label fs-4">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control form-control-lg"
              placeholder="Enter your password"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="confirmPassword" className="form-label fs-4">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control form-control-lg"
              placeholder="Confirm your password"
            />
          </div>
          <div className="col-md-12 text-center">
            <button className="btn btn-primary btn-lg" type="submit">
              Register
            </button>
            <p className="mt-3">
              Aready have an account?{' '}
              <Link to="/login">Sign in Here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>


      
      
      
    );
}

export default Register;
