const mongoose = require("mongoose");

const dailyLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        mood: {
            type: String,
            enum: [
                "Happy",
                "Calm",
                "Confident",
                "Excited",
                "Motivated",
                "Sad",
                "Frustrated",
                "Stressed",
                "Anxious",
                "Emotional",
                "Angry",
                "Depressed"
            ],
            required: true,
        },
        stressLevel: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true,
        },
        focusLevel: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true,
        },
        sleepHours: {
            type: Number,
            min: [0, 'Sleep hours must be at least 0'],
            max: [24, 'Sleep hours cannot exceed 24'],
            required: true,
        },
        exerciseMin: {
            type: Number,
            min: [0, 'Exercise minutes must be at least 0'],
        },
        meditationMin: {
            type: Number,
            min: [0, 'Meditation minutes must be at least 0'],
        },
        waterCups: {
            type: Number,
            min: [0, 'Water cups must be at least 0'],
            max: [22, 'Water cups cannot exceed 22'],
        },
        dietScore: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
        },
        screenHours: {
            type: Number,
            min: [0, 'Screen hours must be at least 0'],
            max: [24, 'Screen hours cannot exceed 24'],
            required: true,
        },
        workHours: {
            type: Number,
            min: [0, 'Work hours must be at least 0'],
            max: [24, 'Work hours cannot exceed 24'],
            required: true,
        },
        hobbyMin: {
            type: Number,
            min: [0, 'Hobby minutes must be at least 0'],
        },
        location: {
            type: String,
            required: true,
        },
        weather: {
            type: String,
        },
        notes: {
            type: String,
        },
    }, {
    timestamps: true,
}
);

const DailyLog = mongoose.model("DailyLog", dailyLogSchema);

module.exports = DailyLog;