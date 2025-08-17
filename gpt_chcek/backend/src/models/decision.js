// models/Decision.js
import mongoose from 'mongoose';

const decisionSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  type: String, // "New Test Ordered", "Workout Plan Updated"
  reason: String, // short summary of why
  decidedBy: String, // e.g. "Dr. Warren"
  date: Date,
  relatedMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});


const Decision = mongoose.model('Decision', decisionSchema);

export default Decision;

