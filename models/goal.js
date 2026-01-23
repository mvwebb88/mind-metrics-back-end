const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        targetMetric: {
            type: String,
            enum: [
                "Sleep Hours",
                "Exercise Minutes",
                "Meditation Minutes",
                "Water Cups",
                "Diet Score",
                "Screen Minutes",
                "Work Hours",
                "Hobby Minutes",
            ],
            required: true,
        },
        targetValue: {
            type: Number,
            min: [0, 'Target value must be at least 0'],
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: [
                "Active",
                "Completed",
                "Paused",
            ],
            required: true,
        },
    }, {
    timestamps: true,
}
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;