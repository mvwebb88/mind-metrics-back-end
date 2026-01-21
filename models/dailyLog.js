const mongoose = require("mongoose");

const dailyLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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
            enum: [
                0, 1, 2, 3, 4, 5, 6,
                7, 8, 9, 10, 11, 12,
                13, 14, 15, 16, 17,
                18, 19, 20
            ],
            required: true,
        },
        exerciseMin: {
            type: Number,
            enum: [
                0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
                65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120,
                125, 130, 135, 140, 145, 160, 165, 170, 175, 180, 185,
                190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240
            ],
            required: true,
        },
        meditationMin: {
            type: Number,
            enum: [
                0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
                65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120,
            ],
            required: true,
        },
        waterCups: {
            type: Number,
            enum: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                12, 13, 14, 15, 16, 17, 18, 19, 20
            ],
            required: true,
        },
        dietScore: {
            type: Number,
            enum: [1, 1, 3, 4, 5],
            required: true,
        },
        screenHours: {
            type: Number,
            enum: [
                0, 1, 2, 3, 4, 5, 6,
                7, 8, 9, 10, 11, 12,
                13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24
            ],
            required: true,
        },
        workHours: {
            type: Number,
            enum: [
                0, 1, 2, 3, 4, 5, 6,
                7, 8, 9, 10, 11, 12,
                13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24
            ],
            required: true,
        },
        hobbyMin: {
            type: Number,
            enum: [
                0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
                65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120,
                125, 130, 135, 140, 145, 160, 165, 170, 175, 180, 185,
                190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240
            ],
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        weather: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            required: true,
        },
    }, {
    timestamps: true,
}
);

const DailyLog = mongoose.model("DailyLog", dailyLogSchema);

module.exports = DailyLog;