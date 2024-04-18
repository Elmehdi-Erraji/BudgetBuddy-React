import React from 'react';

import { useNavigate } from 'react-router-dom';

function Depenses() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token'); // Remove token from local storage
            navigate('/login');
            alert('Logout successful');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
            <div className="card mt-4">
                <div className="card-header">
                    <h4 className="card-title"> Depenses </h4>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
    );
}



export default Depenses;
