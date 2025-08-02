const CompletedGoalItem = ({ goal, toggleComplete, deleteGoal }) => {
    return (
        <li className="group bg-white rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-lg font-medium "> 🎉 {goal.text}</p>
                    <p className="text-gray-500 text-sm">Completed {new Date(goal.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => toggleComplete(goal._id)}
                        title="Mark as Incomplete"
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-2 rounded-lg hover:opacity-90 transition-all duration-200 shadow-md flex items-center justify-center w-10 h-10"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                    </button>
                    <button
                        onClick={() => deleteGoal(goal._id)}
                        title="Delete"
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-2 rounded-lg hover:opacity-90 transition-all duration-200 shadow-md flex items-center justify-center w-10 h-10"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    );
};

export default CompletedGoalItem;
