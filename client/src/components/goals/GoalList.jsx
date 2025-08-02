import GoalItem from './GoalItem';

const GoalList = ({ title, goals, icon, isLoading, editId, editText, setEditText, startEdit, saveEdit, cancelEdit, toggleComplete, deleteGoal, emptyState }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                {icon}
                {title}
            </h3>
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                </div>
            ) : (
                <ul className="space-y-4">
                    {goals.length === 0 ? emptyState : (
                        goals.map(goal => (
                            <GoalItem
                                key={goal._id}
                                goal={goal}
                                editId={editId}
                                editText={editText}
                                setEditText={setEditText}
                                startEdit={startEdit}
                                saveEdit={saveEdit}
                                cancelEdit={cancelEdit}
                                toggleComplete={toggleComplete}
                                deleteGoal={deleteGoal}
                            />
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default GoalList;
