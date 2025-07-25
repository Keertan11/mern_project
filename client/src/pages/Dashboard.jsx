import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [goals, setGoals] = useState([]);
    const [text, setText] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const res = await axios.get('/api/goals', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGoals(res.data);
            } catch (err) {
                // Optionally handle error
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

    return (
        <div>
            <Navbar />
            <h2>Your Goals</h2>
            <form onSubmit={addGoal}>
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Add a goal"
                    required
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {goals.map(goal => (
                    <li key={goal._id}>
                        {goal.text}
                        <button onClick={() => deleteGoal(goal._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;