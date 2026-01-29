const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// For Weather API
const verifyToken = require("./middleware/verify-token.js");
const DailyLog = require("./models/dailyLog.js");

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

// Latest dashboard endpoint
app.get("/dashboard/latest", verifyToken, async (req, res) => {
    try {
        const userId = req.user._id;

        // Get latest daily log by date provided by the user
        const latestLog = await DailyLog.findOne({ userId })
            .sort({ date: -1 }); // sort by user-provided date descending

        if (!latestLog) {
            return res.json({ latestLog: null, weather: null });
        }

        const location = latestLog.location;
        let weather = null;

        // Fetch weather only if location exists
        if (location) {
            const weatherRes = await fetch(
                `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}`
            );
            const weatherData = await weatherRes.json();
            weather = {
                location: weatherData.location.name,
                temp: weatherData.current.temp_c,
                condition: weatherData.current.condition.text,
                icon: weatherData.current.condition.icon,
            };
        }

        // Send combined response
        res.json({ latestLog, weather });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch latest log" });
    }
});

// Routes go here
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/dailylogs', dailyLogsRouter);
app.use('/goals', goalsRouter);


app.listen(PORT, () => {
    console.log('The express app is ready!');
});
