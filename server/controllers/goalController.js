const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')


// Get goals GET /api/goals Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})


// Set goals POST /api/goals Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(404)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goal);
})


// Update goals PATCH /api/goals/:id Private
const UpdateCompletion = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found!!')
    }

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not Found!!')
    }
    if (goal.user.toString() != user.id) {
        res.status(401)
        throw new Error('User not Authorized')
    }
    // Update the completion status
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, {
        Completed: !goal.Completed
    }, {
        new: true,
    })
    console.log(updatedGoal);
    res.status(200).json(updatedGoal);
})


// Update goals PUT /api/goals/:id Private
const updateGoal = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found!!')
    }

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not Found!!')
    }
    if (goal.user.toString() != user.id) {
        res.status(401)
        throw new Error('User not Autorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal);
})


// Delete goals DELETE /api/goals/:id Private
const deleteGoal = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found!!')
    }

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not Found!!')
    }
    if (goal.user.toString() != user.id) {
        res.status(401)
        throw new Error('User not Autorized')
    }

    await goal.deleteOne()
    res.status(200).json({ message: `Goal Deleted`, id: req.params.id });
})


module.exports = {
    getGoals,
    setGoal,
    UpdateCompletion,
    updateGoal,
    deleteGoal
}