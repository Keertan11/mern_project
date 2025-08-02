const GoalItem = ({ goal, editId, editText, setEditText, startEdit, saveEdit, cancelEdit, toggleComplete, deleteGoal }) => {
    return (
        <li className="group bg-white rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
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
                                title="Save"
                                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-lg hover:opacity-90 transition-all duration-200 shadow-md flex items-center justify-center w-10 h-10"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </button>
                            <button
                                onClick={cancelEdit}
                                title="Cancel"
                                className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center w-10 h-10"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                                onClick={() => toggleComplete(goal._id)}
                                title="Complete"
                                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-lg hover:opacity-90 transition-all duration-200 shadow-md flex items-center justify-center w-10 h-10"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => startEdit(goal)}
                                title="Edit"
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2 rounded-lg hover:opacity-90 transition-all duration-200 shadow-md flex items-center justify-center w-10 h-10"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
                    )}
                </div>
            </div>
        </li>
    );
};

export default GoalItem;
