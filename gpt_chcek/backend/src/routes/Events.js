import express from 'express';
import Event from '../models/events.js';
import Decision from '../models/decision.js';

const router = express.Router();

// Get all events for a member
router.get('/:memberId', async (req, res) => {
  const events = await Event.find({ memberId: req.params.memberId }).populate('relatedMessages');
  res.json(events);
});

// Get all decisions for a member
router.get('/:memberId/decisions', async (req, res) => {
  const decisions = await Decision.find({ memberId: req.params.memberId }).populate('relatedMessages');
  res.json(decisions);
});

// Get timeline (merge events + decisions)
router.get('/:memberId/timeline', async (req, res) => {
  const events = await Event.find({ memberId: req.params.memberId });
  const decisions = await Decision.find({ memberId: req.params.memberId });
  const timeline = [...events, ...decisions].sort(
    (a, b) => new Date(a.date || a.startDate) - new Date(b.date || b.startDate)
  );
  res.json(timeline);
});

export default router;
