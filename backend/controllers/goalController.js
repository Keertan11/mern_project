const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')


// Get goals GET /api/goals Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()

    res.status(200).json(goals)
})


// Set goals POST /api/goals Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(404)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
    })

    res.status(200).json(goal);
})


// Update goals PUT /api/goals/:id Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not Found!!')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal);
})


// Delete goals DELETE /api/goals/:id Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        req.status(400)
        throw new Error('Goal Not Found!!')
    }

    await goal.deleteOne()
    res.status(200).json({ message: `Goal Deleted`, id: req.params.id });
})


module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}