import axios from "axios";
import { useNavigate } from 'react-router-dom';
import React from "react";

function Create() {
    const navigate = useNavigate(); // Define navigate function using useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title: e.target.title.value,
            description: e.target.description.value,
            expense: e.target.expense.value
        };
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/depenses', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Expense added successfully!');
            navigate('/'); // Use the navigate function to go back to the home page
            e.target.reset(); 
        } catch (error) {
            console.error('Expense add failed:', error);
            if (error.response && error.response.data) {
                alert(error.response.data.message); // Display error message from the server
            }
        }
    };
    const handleHomeClick = () => {
        navigate('/'); 
      };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5 shadow border-primary" style={{ maxWidth: '800px' }}>
        <h2 className="text-center mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-12">
            <label htmlFor="title" className="form-label fs-4">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control form-control-lg"
              required
              placeholder="Enter title"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="description" className="form-label fs-4">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              className="form-control form-control-lg"
              placeholder="Enter description (optional)"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="expense" className="form-label fs-4">Expense</label>
            <input
              type="number"
              id="expense"
              name="expense"
              className="form-control form-control-lg"
              required
              placeholder="Enter expense amount"
            />
          </div>
          <div className="col-md-12 d-flex justify-content-between">
            <button className="btn btn-primary btn-lg" type="submit">
              Add
            </button>
            <button className="btn btn-secondary btn-lg" onClick={handleHomeClick}>
              Home
            </button>
          </div>
        </form>
      </div>
    </div>
    );
}

export default Create;
