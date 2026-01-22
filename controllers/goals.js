const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Goal = require("../models/goal.js");
const router = express.Router();

//POST: CREATE A GOAL PER USER
router.post("/", verifyToken, async (req, res) => {
    try {
        req.body.userId = req.user._id;
        const goal = await Goal.create(req.body);

        goal._doc.userId = req.user;

        res.status(201).json(goal);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

//GET: LIST GOALS PER USER
router.get("/", verifyToken, async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user._id }).sort({
            createdAt: "desc",
        });
        res.status(200).json(goals);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

//GET: 1 GOAL
router.get("/:goalId", verifyToken, async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId);

        if (!goal.userId.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        res.status(200).json(goal);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// PUT: UPDATE A GOAL
router.put("/:goalId", verifyToken, async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId);

        if (!goal.userId.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.goalId,
            req.body,
            { new: true },
        );

        updatedGoal._doc.userId = req.user;

        res.status(200).json(updatedGoal);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

//DELETE A GOAL
router.delete("/:goalId", verifyToken, async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId);
        if (!goal.userId.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        const deletedGoal = await Goal.findByIdAndDelete(req.params.goalId);

        res.status(200).json(deletedGoal);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;
