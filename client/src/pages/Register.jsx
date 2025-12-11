import React, { useState } from 'react';
import AuthService from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('customer'); // Default to customer
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register(username, password, name, role);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Username may be taken.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="glass-card" style={{ width: '400px', padding: '40px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
                {error && <div style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* In a real app, maybe hide role selection or use specific logic */}
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="customer">Customer</option>
                        {/* Demo purposes - normally public can't register as admin/staff */}
                        <option value="admin">Admin (Demo)</option>
                        <option value="waiter">Waiter (Demo)</option>
                        <option value="reception">Reception (Demo)</option>
                        <option value="cashier">Cashier (Demo)</option>
                    </select>

                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Sign Up</button>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Link to="/login" style={{ color: 'var(--primary-color)' }}>Already have an account? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
