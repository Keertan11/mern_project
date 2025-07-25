import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('/api/users', { name, email, password });
            login(res.data.token);
            navigate('/');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Registration failed');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Register</h2>
                {error && <div className="mb-4 text-red-600">{error}</div>}
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 px-4 py-2 border rounded-lg"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    Register
                </button>
                <div className="mt-4 text-center">
                    Already have an account? {'  '}
                    <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
                </div>
                <div className="mt-2 flex justify-center">
                    <Link
                        to="/"
                        className="inline-block bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100 hover:bg-blue-100 hover:text-blue-800 transition text-sm font-medium shadow-none"
                        style={{ minWidth: '80px', textAlign: 'center' }}
                    >
                        ← Back To Home
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;