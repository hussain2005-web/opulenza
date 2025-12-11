import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar glass-panel">
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                Opulenza
            </Link>
            <div>
                <span style={{ marginRight: '15px', color: 'var(--text-secondary)' }}>
                    Welcome, {currentUser?.name} ({currentUser?.role})
                </span>
                <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
