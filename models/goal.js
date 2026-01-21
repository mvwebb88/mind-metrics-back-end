const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
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
            required: true,
        },
    }, {
    timestamps: true,
}
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;