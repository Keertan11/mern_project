import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [goals, setGoals] = useState([]);
    const [text, setText] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');
    
    // Add completed state to track completed goals
    // const [showCompleted, setShowCompleted] = useState(false);
    // const completedGoals = goals.filter(goal => goal.completed);
    // const activeGoals = goals.filter(goal => !goal.completed);

    useEffect(() => {
        const fetchGoals = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get('/api/goals', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGoals(res.data);
            } catch (err) {
                // Optionally handle error
            } finally {
                setIsLoading(false);
            }
        };
        fetchGoals();
    }, [token]);

    const addGoal = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/goals', { text }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGoals([...goals, res.data]);
            setText('');
        } catch (err) {
            // Optionally handle error
        }
    };


    const deleteGoal = async (id) => {
        try {
            await axios.delete(`/api/goals/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGoals(goals.filter(goal => goal._id !== id));
        } catch (err) {
            // Optionally handle error
        }
    };

    const startEdit = (goal) => {
        setEditId(goal._id);
        setEditText(goal.text);
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditText('');
    };

    const saveEdit = async (id) => {
        try {
            const res = await axios.put(`/api/goals/${id}`, { text: editText }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGoals(goals.map(goal => goal._id === id ? res.data : goal));
            setEditId(null);
            setEditText('');
        } catch (err) {
            // Optionally handle error
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col items-center py-10 px-4">
                <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient"></div>
                <div className="w-full max-w-5xl">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">My Goals</h2>
                            <p className="text-gray-600">Track, manage, and achieve your goals</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Goal</h3>
                        <form onSubmit={addGoal}>
                            <div className="flex flex-col items-center justify-center gap-3 xs:flex-row">
                                <div className="flex-1 w-full relative">
                                    <input
                                        value={text}
                                        onChange={e => setText(e.target.value)}
                                        placeholder="What's your next goal?"
                                        required
                                        className="w-full px-6 py-4 rounded-lg focus:outline-none text-gray-800 text-lg placeholder:text-gray-400 border-2 border-transparent focus:border-purple-300 transition-all duration-200 outline"
                                    />
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        {text.length}/100
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                                    </svg>
                                    Add Goal
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Add specific, measurable, and achievable goals</p>
                        </form>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="flex w-full justify-center gap-5">
                            <div className="bg-white p-4 rounded-xl shadow-md">
                                <div className="text-2xl font-bold text-purple-600 mb-1">{goals.length}</div>
                                <div className="text-sm text-gray-500">Total Goals</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-md">
                                <div className="text-2xl font-bold text-indigo-600 mb-1">{goals.filter(g => !g.completed).length}</div>
                                <div className="text-sm text-gray-500">In Progress</div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                                </svg>
                                In Progress
                            </h3>
                            {isLoading ? (
                                <div className="flex justify-center items-center h-40">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {goals.length === 0 ? (
                                        <div className="text-center py-8 bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200">
                                            <div className="text-4xl mb-3">🎯</div>
                                            <p className="text-gray-500">No goals yet. Add your first goal!</p>
                                            <button 
                                                onClick={() => document.querySelector('input').focus()}
                                                className="mt-4 text-purple-600 font-medium hover:text-purple-700"
                                            >
                                                Start Now →
                                            </button>
                                        </div>
                                    ) : (
                                        goals.filter(g => !g.completed).map(goal => (
                                            <li
                                                key={goal._id}
                                                className="group bg-white rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center transform rotate-3">
                                                        <span className="text-xl text-white font-bold select-none">
                                                            {goal.text.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        {editId === goal._id ? (
                                                            <input
                                                                value={editText}
                                                                onChange={e => setEditText(e.target.value)}
                                                                className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-gray-800 text-lg"
                                                                autoFocus
                                                            />
                                                        ) : (
                                                            <>
                                                                <p className="text-gray-800 text-lg font-medium">{goal.text}</p>
                                                                <p className="text-gray-500 text-sm">Added {new Date(goal.createdAt).toLocaleDateString()}</p>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {editId === goal._id ? (
                                                            <>
                                                                <button
                                                                    onClick={() => saveEdit(goal._id)}
                                                                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 text-sm font-medium shadow-md flex items-center gap-1"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                                                    </svg>
                                                                    Save
                                                                </button>
                                                                <button
                                                                    onClick={cancelEdit}
                                                                    className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm font-medium"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                <button
                                                                    onClick={() => startEdit(goal)}
                                                                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 text-sm font-medium shadow-md flex items-center gap-1"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                                    </svg>
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteGoal(goal._id)}
                                                                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 text-sm font-medium shadow-md flex items-center gap-1"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                                    </svg>
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                </svg>
                                Completed Goals
                            </h3>
                            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-3">🎉</div>
                                    <p className="text-gray-500">Complete your goals to see them here!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;