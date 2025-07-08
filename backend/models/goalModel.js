const mongoose = require('mongoose')

const gaolSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'add a text field ']
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Goal', gaolSchema)