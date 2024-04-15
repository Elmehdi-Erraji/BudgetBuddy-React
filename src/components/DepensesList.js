import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Edit from './Edit'; // Import the modal component for editing depenses
import Create from './Create'; // Import the Create component
function Index() {
  const [depenses, setDepenses] = useState([]);
  const [editDepense, setEditDepense] = useState(null);

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
      } catch (error) {
        console.error('Error fetching depenses:', error);
      }
    }

    fetchDepenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/depenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Filter out the deleted depense from the state
      setDepenses(prevDepenses => prevDepenses.filter(depense => depense.id !== id));
      alert('Expense deleted successfully!');
    } catch (error) {
      console.error('Expense delete failed:', error);
      if (error.response && error.response.data) {
        alert(error.response.data.message); // Display error message from the server
      }
    }
  };

  const handleEdit = (depense) => {
    setEditDepense(depense);
  };

  const handleUpdateDepense = (updatedDepense) => {
    setDepenses(prevDepenses => prevDepenses.map(depense => depense.id === updatedDepense.id ? updatedDepense : depense));
  };

  const closeEditModal = () => {
    setEditDepense(null); // Function to close the edit modal
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h4 className="card-title">Depenses</h4>
      </div>
      <div className="card-body">
        <Link to="/create" className="btn btn-primary mb-3">Add Expense</Link>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th className="text-center">Id</th>
                <th className="text-center">Title</th>
                <th className="text-center">Description</th>
                <th className="text-center">Expense</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {depenses.map((depense) => (
                <tr key={depense.id}>
                  <td className="text-center">{depense.id}</td>
                  <td>{depense.title}</td>
                  <td>{depense.description}</td>
                  <td className="text-right">{depense.expense}</td>
                  <td className="text-center">
                    <Edit depenseId={depense.id} handleClose={closeEditModal} /> {/* Pass handleClose to close modal */}
                    <span style={{ marginRight: '8px' }}></span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(depense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editDepense && ( 
        <Edit depenseId={editDepense.id} handleClose={closeEditModal} />
      )}
    </div>
  );
}

export default Index;