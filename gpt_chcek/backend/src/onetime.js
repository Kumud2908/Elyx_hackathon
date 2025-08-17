// scripts/generateInitialEvents.js
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import Message from './models/message.js';
import { generateEventsFromMessages } from './services/eventGenerator.js';

// For __dirname support in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    await mongoose.connect('mongodb+srv://sagarkumud561:u1RQJzTbzK8iAVFI@cluster0.l4vnpi1.mongodb.net/elyxNew?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    const members = await Message.distinct('memberId');
    console.log(members);

    for (const memberId of members) {
      const messages = await Message.find({ memberId }).sort({ timestamp: 1 });
      await generateEventsFromMessages(messages, memberId);
      console.log(`✅ Events generated for member: ${memberId}`);
    }

    // mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('❌ Error generating events:', err);
    mongoose.disconnect();
  }
})();
