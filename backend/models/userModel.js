const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Add a Name']
    },
    email: {
        type: String,
        required: [true, 'Add an Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Add a password']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema) 