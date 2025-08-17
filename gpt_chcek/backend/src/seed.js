import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Message from "./models/message.js";
import Event from "./models/events.js";
import Member from "./models/member.js";

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old test data
    await Message.deleteMany({});
    await Event.deleteMany({});
    await Member.deleteMany({});

    // Create a member
    const member = await Member.create({
      name: "John Tan",
      location: "Singapore",
      chronicCondition: "High Blood Pressure",
      hoursPerWeek: 5
    });

    // Create messages
    const messages = await Message.insertMany([
      {
        sender: "Member",
        content: "Hey, I just noticed my blood pressure is still a bit high this week.",
        timestamp: new Date("2025-08-01T09:15:00Z"),
        memberId: member._id
      },
      {
        sender: "Coach",
        content: "Thanks for letting us know. Have you been able to follow the exercise plan this week?",
        timestamp: new Date("2025-08-01T09:20:00Z"),
        memberId: member._id
      },
      {
        sender: "Member",
        content: "Only about half, I was traveling.",
        timestamp: new Date("2025-08-01T09:25:00Z"),
        memberId: member._id
      }
    ]);

    // Create an event
    const event = await Event.create({
      type: "Plan Adjustment",
      reason: "Member missed exercises due to travel",
      relatedMessages: messages.map(m => m._id),
      memberId: member._id,
      timestamp: new Date("2025-08-01T09:30:00Z")
    });

    console.log("✅ Seed data inserted:");
    console.log("   Member ID:", member._id.toString());
    console.log("   Event ID:", event._id.toString());

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedData();
