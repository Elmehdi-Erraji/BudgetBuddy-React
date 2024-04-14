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

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-sm">
                    <label>Title</label>
                    <input type="text" name="title" className="form-control" required />
                </div>
                <div className="col-sm">
                    <label>Description</label>
                    <input type="text" name="description" className="form-control" required />
                </div>
                <div className="col-sm">
                    <label>Expense</label>
                    <input type="number" name="expense" className="form-control" required />
                </div>
                <div className="col-sm">
                    <button className="btn btn-primary mt-4" type="submit">Add</button>
                </div>
            </div>
        </form>
    );
}

export default Create;
