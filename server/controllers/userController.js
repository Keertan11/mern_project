const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Register POST /api/users  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: GenerateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// Authenticate POST /api/users/login  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body || {};
    const user = email && password ? await User.findOne({ email }) : null;

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: GenerateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Authentication Failed!!')
    }
})

// Get user data  GET /api/users/me  Public
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

// Generate JWT
const GenerateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
}