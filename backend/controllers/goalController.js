const asyncHandler = require('express-async-handler')


// Get goals GET /api/goals Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get Goals' });
})


// Set goals POST /api/goals Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: 'Set Goal' });
})


// Update goals PUT /api/goals/:id Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id} ` });
})


// Delete goals DELETE /api/goals/:id Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id} ` });
})


module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}