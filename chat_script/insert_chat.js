const fs = require("fs");
const mongoose = require("mongoose");

// Schema
const messageSchema = new mongoose.Schema({
     memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  timestamp: Date,
  sender: String,
  role: String, // 'member' or 'elyx'
  content: String
});

const Message = mongoose.model("Message", messageSchema);

// Function to parse WhatsApp-style chat
function parseChat(rawText) {
  return rawText
    .split("\n")
    .map(line => line.trim()) // remove \r
    .filter(line => line !== "")
    .map(line => {
      const match = line.match(/^(\d{2}\/\d{2}\/\d{2,4}), (\d{1,2}:\d{2}) - (.*?): (.*)$/);
      if (!match) return null;

      const [_, date, time, sender, content] = match;
      const [day, month, yearRaw] = date.split("/").map(Number);

      // handle 2-digit or 4-digit years
      const year = yearRaw < 100 ? 2000 + yearRaw : yearRaw;

      // build ISO string manually
      const isoDateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${time}:00`;

      const timestamp = new Date(isoDateStr);

      let role = sender.toLowerCase().includes("rohan") ? "member" : "elyx";

      return {
        memberId: "64e123abcde4567890f12345",
        timestamp,
        sender: sender.trim(),
        role,
        content: content.trim()
      };
    })
    .filter(Boolean);
}


async function main() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect("mongodb+srv://sagarkumud561:u1RQJzTbzK8iAVFI@cluster0.l4vnpi1.mongodb.net/elyxNew?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");

    // 2. Read chat file
    const rawText = fs.readFileSync("chat.txt", "utf8");

    // 3. Parse messages
    console.log(rawText.split("\n").slice(0, 10));
    const messages = parseChat(rawText);

    // 4. Insert into MongoDB
    await Message.insertMany(messages);
    console.log(`✅ Inserted ${messages.length} messages`);

    // 5. Close connection
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

main();
