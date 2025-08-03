const express = require('express')
const colors = require('colors')
const { connectDB } = require('./config/db')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const path = require('path')

connectDB()

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// server frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, '../', 'client', 'dist', 'index.html'
            ))
    })
} else {
    app.get('/', (req, res) => {
        res.send('Please set to production')
    })
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

