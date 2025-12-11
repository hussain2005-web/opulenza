import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="glass-card" style={{ width: '400px', padding: '40px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign In</h2>
                {error && <div style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
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
                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Login</button>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Link to="/register" style={{ color: 'var(--primary-color)' }}>New User? Register here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
