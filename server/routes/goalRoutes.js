const express = require('express');
const router = express.Router();
const {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
    UpdateCompletion
} = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).patch(protect, UpdateCompletion).delete(protect, deleteGoal)

module.exports = router; 