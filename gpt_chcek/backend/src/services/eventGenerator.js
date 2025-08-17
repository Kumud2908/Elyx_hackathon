// services/eventGenerator.js
import Event from '../models/events.js';

/**
 * Generates events from a list of messages for a given member.
 * Groups messages into events if they are within 2 days of each other.
 */
export async function generateEventsFromMessages(messages, memberId) {
  await Event.deleteMany({ memberId }); // clear old events

  let events = [];
  let currentGroup = [];
  let lastTimestamp = null;

  for (let msg of messages) {
    const currentTime = new Date(msg.timestamp);

    // Start a new event if > 2 days gap
    if (!lastTimestamp || (currentTime - lastTimestamp) > (2 * 24 * 60 * 60 * 1000)) {
      if (currentGroup.length > 0) {
        events.push(await saveEvent(currentGroup, memberId));
      }
      currentGroup = [];
    }

    currentGroup.push(msg);
    lastTimestamp = currentTime;
  }

  // Save the last group if exists
  if (currentGroup.length > 0) {
    events.push(await saveEvent(currentGroup, memberId));
  }

  return events;
}

/**
 * Saves a single grouped event to the DB
 */
async function saveEvent(messages, memberId) {
  const title = classifyTitle(messages);
  const topic = classifyTopic(messages);
  const trigger = detectTrigger(messages);
  const outcome = detectOutcome(messages);

  const event = new Event({
    memberId,
    title,
    topic,
    trigger,
    outcome,
    startDate: messages[0].timestamp,
    endDate: messages[messages.length - 1].timestamp,
    relatedMessages: messages.map(m => m._id)
  });

  return await event.save();
}

/**
 * Classifiers — replace with smarter NLP logic later
 */
function classifyTitle(messages) {
  return "Generic Event"; // Placeholder
}

function classifyTopic(messages) {
  return "General"; // Placeholder
}

function detectTrigger(messages) {
  return "Member"; // Placeholder
}

function detectOutcome(messages) {
  return "Info Provided"; // Placeholder
}
