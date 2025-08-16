import mongoose from "mongoose";
import Member from "./models/member.js"; // adjust path if needed

await mongoose.connect("mongodb+srv://sagarkumud561:u1RQJzTbzK8iAVFI@cluster0.l4vnpi1.mongodb.net/elyxNew?retryWrites=true&w=majority&appName=Cluster0");

const members = [
  {
    _id: new mongoose.Types.ObjectId("64e123abcde4567890f12345"),
    memberId: new mongoose.Types.ObjectId("64e123abcde4567890f12345"),
    name: "Riya",
    location: "New York",
    chronicCondition: "Type 2 Diabetes"
    
  },
  {
    _id: new mongoose.Types.ObjectId("66c3f7a2b8e5c9e5f4e22222"),
    memberId: new mongoose.Types.ObjectId("66c3f7a2b8e5c9e5f4e22222"),
    name: "Alex",
    location: "San Francisco",
    chronicCondition: "Hypertension"
    
  },
  {
    _id: new mongoose.Types.ObjectId("66c3f7a2b8e5c9e5f4e33333"),
    memberId: new mongoose.Types.ObjectId("66c3f7a2b8e5c9e5f4e33333"),
    name: "Maya",
    location: "Chicago",
    chronicCondition: "Asthma"
   
  }
];

async function seed() {
  try {
    await Member.deleteMany({});
    const inserted = await Member.insertMany(members);
    console.log("✅ Members seeded:", inserted.map(m => m.name));
  } catch (err) {
    console.error("❌ Error seeding members:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
