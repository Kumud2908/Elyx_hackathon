// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  title: String, // e.g. "Lab Test Scheduling"
  trigger: String, // Member, Elyx
  topic: String, // "Diagnostics", "Workout", "Travel"
  outcome: String,
  startDate: Date,
  endDate: Date,
  beforeState: String,
  afterState: String,
  metrics: {
    responseTimeMinutes: Number,
    resolutionTimeDays: Number,
    hoursDoctor: Number,
    hoursCoach: Number
  },
  relatedMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

// Optional: Add index for faster member + date queries in timelines

const Event = mongoose.model('Event', eventSchema);

export default Event;
