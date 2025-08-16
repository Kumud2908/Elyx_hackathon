import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
  name: String,
  location: String,
  chronicCondition: String,
  hoursPerWeek: Number
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);
