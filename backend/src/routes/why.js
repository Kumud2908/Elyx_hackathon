import mongoose from "mongoose";
import Event from "../models/events.js";
import Message from "../models/message.js"; // assuming you have this model
import express from 'express';
import { askLLM } from "../services/llmService.js";
const router = express.Router();

router.get("/:event_id", async (req, res) => {
  try {
    const { event_id } = req.params;
    console.log("event_id is--------", event_id);

    // ✅ validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(event_id)) {
      return res.status(400).json({ error: "Invalid event id" });
    }

    // ✅ populate related messages
    const event = await Event.findById(event_id).populate("relatedMessages");
    if (!event) return res.status(404).json({ error: "Event not found" });

    // ✅ format messages (directly from populated relatedMessages)
    const formattedMessages = event.relatedMessages
      .map(m => `[${m.timestamp.toISOString()}] ${m.sender}: ${m.content}`)
      .join("\n");

    const prompt = [
      { role: "system", content: "You are a health assistant that explains why an event happened using only the given messages and providing exact timestamp references." },
      { role: "user", content: `Messages:\n${formattedMessages}\n\nTask:\n1. State the reason for the event.\n2. Identify the initiator.\n3. List exact message references.` }
    ];

    const summary = await askLLM(prompt);

    res.json({ event_id: event._id, summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
