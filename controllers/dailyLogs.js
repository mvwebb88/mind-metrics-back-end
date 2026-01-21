const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const DailyLog = require("../models/dailyLog.js");
const router = express.Router();

// POST /dailylogs
router.post("/", verifyToken, async (req, res) => {
    try {
        req.body.userId = req.user._id;
        const dailyLog = await DailyLog.create(req.body);
        // .doc is used to populate the userId
        dailyLog._doc.userId = req.user;
        res.status(201).json(dailyLog);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});






module.exports = router;