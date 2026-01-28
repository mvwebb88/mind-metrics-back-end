const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

const authRouter = require('./controllers/auth');
const usersRouter = require('./controllers/users');
const dailyLogsRouter = require('./controllers/dailyLogs');
const goalsRouter = require('./controllers/goals');

mongoose.connect(process.env.MONGODB_URI);
const PORT = process.env.PORT

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes go here
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/dailylogs', dailyLogsRouter);
app.use('/goals', goalsRouter);


app.listen(PORT, () => {
    console.log('The express app is ready!');
});
