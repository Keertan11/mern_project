import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import GoalStats from '../components/goals/GoalStats';
import AddGoalForm from '../components/goals/AddGoalForm';
import GoalList from '../components/goals/GoalList';
import CompletedGoalItem from '../components/goals/CompletedGoalItem';

const Dashboard = () => {
    const [goals, setGoals] = useState([]);
    const [text, setText] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');

    // Compute filtered goals directly
    const completedGoals = goals.filter(goal => goal.Completed);
    const activeGoals = goals.filter(goal => !goal.Completed);

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
            setGoals(prevGoals => [...prevGoals, res.data]);
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
            setGoals(prevGoals => prevGoals.filter(goal => goal._id !== id));
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
            setGoals(prevGoals => prevGoals.map(goal => goal._id === id ? res.data : goal));
            setEditId(null);
            setEditText('');
        } catch (err) {
            console.error('Error updating goal:', err);
        }
    };

    const toggleComplete = async (id) => {
        try {
            const goal = goals.find(g => g._id === id);
            if (!goal) {
                console.log('Goal not found');
                return;
            }

            const res = await axios.patch(`/api/goals/${id}`, { Completed: !goal.Completed }, {
                headers: { Authorization: `Bearer ${token}` },
            });


            // Update goals directly with new data
            setGoals(prevGoals => prevGoals.map(g => g._id === id ? res.data : g));
        } catch (err) {
            console.error('Error toggling goal completion:', err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col items-center py-10 px-4">
                <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient"></div>
                <div className="w-full max-w-5xl">
                    <GoalStats goals={goals} />

                    <AddGoalForm text={text} setText={setText} addGoal={addGoal} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GoalList
                            title="In Progress"
                            goals={activeGoals}
                            icon={
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            }
                            isLoading={isLoading}
                            editId={editId}
                            editText={editText}
                            setEditText={setEditText}
                            startEdit={startEdit}
                            saveEdit={saveEdit}
                            cancelEdit={cancelEdit}
                            toggleComplete={toggleComplete}
                            deleteGoal={deleteGoal}
                            emptyState={
                                <div className="text-center py-8 bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200">
                                    <div className="text-4xl mb-3">🎯</div>
                                    <p className="text-gray-500">No goals yet. Add your goal!</p>
                                    <button
                                        onClick={() => document.querySelector('input').focus()}
                                        className="mt-4 text-purple-600 font-medium hover:text-purple-700"
                                    >
                                        Start Now →
                                    </button>
                                </div>
                            }
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Completed Goals
                            </h3>
                            {completedGoals.length === 0 ? (
                                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-3">🎉</div>
                                        <p className="text-gray-500">Complete your goals to see them here!</p>
                                    </div>
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {completedGoals.map(goal => (
                                        <CompletedGoalItem
                                            key={goal._id}
                                            goal={goal}
                                            toggleComplete={toggleComplete}
                                            deleteGoal={deleteGoal}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;