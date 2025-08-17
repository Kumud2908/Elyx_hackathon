import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  timestamp: Date,
  sender: String,
  role: String, // 'member' or 'elyx'
  content: String
});
// After a message is saved, regenerate events for this member
messageSchema.post('save', async function(doc) {
  try {
    const Message = mongoose.model('Message');
    const allMessages = await Message.find({ memberId: doc.memberId }).sort({ timestamp: 1 });
    await generateEventsFromMessages(allMessages, doc.memberId);
  } catch (err) {
    console.error('Error generating events:', err);
  }
});


export default mongoose.model("Message", messageSchema);
