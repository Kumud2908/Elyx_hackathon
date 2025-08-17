import Message from "../models/message.js";

export async function getMessagesAroundEvent(event) {
  const start = new Date(event.timestamp);
  start.setDate(start.getDate() - 7);

  const end = new Date(event.timestamp);
  end.setDate(end.getDate() + 7);

  return Message.find({
    timestamp: { $gte: start, $lte: end }
  }).sort({ timestamp: 1 });
}
