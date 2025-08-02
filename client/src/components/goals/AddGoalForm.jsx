import React from 'react';

const AddGoalForm = ({ text, setText, addGoal }) => {
    return (
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
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hidden xs:block">
                            {text.length}/100
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Goal
                    </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Add specific, measurable, and achievable goals</p>
            </form>
        </div>
    );
};

export default AddGoalForm;
