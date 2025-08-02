import React from 'react';

const GoalStats = ({ goals }) => {
    return (
        <div className="flex flex-col items-center justify-between mb-12 gap-6 xs:flex-row">
            <div>
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">My Goals</h2>
                <p className="text-gray-600">Track, manage, and achieve your goals</p>
            </div>
            <div className="flex justify-center gap-5 w-full xs:w-auto">
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{goals.length}</div>
                    <div className="text-sm text-gray-500">Total Goals</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <div className="text-2xl font-bold text-indigo-600 mb-1">{goals.filter(g => !g.Completed).length}</div>
                    <div className="text-sm text-gray-500">In Progress</div>
                </div>
            </div>
        </div>
    );
};

export default GoalStats;
