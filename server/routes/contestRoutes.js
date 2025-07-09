const express = require('express');
const router = express.Router();
const Contest = require('../models/Contest');

// Create a new contest
router.post('/create', async (req, res) => {
    const { code, problems, startTime, duration } = req.body;
    try {
        const existing = await Contest.findOne({ code });
        if (existing) return res.status(400).json({ error: "Contest already exists" });

        const contest = new Contest({
            code,
            problems,
            attendees: [],
            startTime,
            duration,
            standings: {}
        });
        await contest.save();
        res.json(contest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Join contest
router.post('/join', async (req, res) => {
    const { code, userId } = req.body;
    try {
        const contest = await Contest.findOne({ code });
        if (!contest) return res.status(404).json({ error: 'Contest not found' });
        if (!contest.attendees.includes(userId)) {
            contest.attendees.push(userId);
            await contest.save();
        }
        res.json(contest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:code', async (req, res) => {
    try {
        const contest = await Contest.findOne({ code: req.params.code });
        if (!contest) return res.status(404).json({ error: "Contest not found" });
        res.json({
            problems: contest.problems,
            standings: contest.standings,
            startTime: contest.startTime,
            duration: contest.duration,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:code/add-problem', async (req, res) => {
    const { problem } = req.body;

    if (!problem) return res.status(400).json({ error: "Missing problem" });

    try {
        const contest = await Contest.findOne({ code: req.params.code });
        if (!contest) return res.status(404).json({ error: "Contest not found" });

        contest.problems.push(problem);
        await contest.save();

        res.json({ success: true, problems: contest.problems });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
