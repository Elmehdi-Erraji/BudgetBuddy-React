import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Edit({handleClose}) { // Add handleClose prop for closing modal

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expense, setExpense] = useState(0);
  const [data, setData] = useState({
    title: '',
    description: '',
    expense: '',
  });
  


  const {id}=useParams()


  useEffect(() => {
    async function fetchDepense() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/depenses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  

        console.log(response.data)
        // setTitle(response.data.title);
        setData(response.data)
      } catch (error) {
        console.error('Error fetching depense:', error);
      }
    }

    fetchDepense();
  }, []);

  const handleTitleChange = (e) => {
    setData(prevState => ({
      ...prevState, 
      title: e.target.value 
    }));
  };

  const handleDescriptionChange = (e) => {
    setData(prevState => ({
      ...prevState, 
      description: e.target.value 
    }));  };

  const handleExpenseChange = (e) => {
    setData(prevState => ({
      ...prevState, 
      expense: e.target.value 
    }));  };


    console.log(data)
  const handleUpdateDepense = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/api/depenses/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Depense updated successfully!');
      if (handleClose) handleClose(); // Call handleClose to close modal (if applicable)
    } catch (error) {
      console.error('Depense update failed:', error);
    }
  };

  return (
    <form onSubmit={handleUpdateDepense} className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5 shadow border-primary" style={{ maxWidth: '800px' }}>
        <h2 className="text-center mb-4">Edit Expense</h2>
        <div className="row g-3"> {/* Inner form for layout */}
          <div className="col-md-12">
            <label htmlFor="title" className="form-label fs-4">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control form-control-lg"
              required
              placeholder="Enter title"
              value={data.title}
              onChange={handleTitleChange}
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
              value={data.description}
              onChange={handleDescriptionChange}
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
              value={data.expense}
              onChange={handleExpenseChange}
            />
          </div>
          <div className="col-md-12 d-flex justify-content-between">
            <button className="btn btn-primary btn-lg" type="submit">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Edit;
