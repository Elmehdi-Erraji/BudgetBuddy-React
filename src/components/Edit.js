// Edit.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Edit({ depenseId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    async function fetchDepense() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/depenses/${depenseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const { title, description, expense } = response.data.depense;
        setTitle(title);
        setDescription(description);
        setExpense(expense);
      } catch (error) {
        console.error('Error fetching depense:', error);
      }
    }

    fetchDepense();
  }, [depenseId]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleExpenseChange = (e) => {
    setExpense(e.target.value);
  };

  const handleUpdateDepense = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/api/depenses/${depenseId}`, { title, description, expense }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Depense updated successfully!');
    } catch (error) {
      console.error('Depense update failed:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdateDepense}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" value={description} onChange={handleDescriptionChange} />
        </div>
        <div>
          <label htmlFor="expense">Expense:</label>
          <input type="number" id="expense" name="expense" value={expense} onChange={handleExpenseChange} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Edit;
