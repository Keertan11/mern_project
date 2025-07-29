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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
            <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>
            <div className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center justify-center mb-8 select-none">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                            </svg>
                        </span>
                    </Link>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Create Account</h2>
                    <p className="text-gray-600 mt-2">Start your journey to achieving your goals</p>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-100 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-800 text-base"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-100 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-800 text-base"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Choose a strong password"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-100 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-800 text-base"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                        >
                            Create Account
                        </button>
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;