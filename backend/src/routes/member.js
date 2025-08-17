import express from "express";
import Member from "../models/member.js";
import Message from "../models/message.js";

const router = express.Router();

// GET all members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET one member by ID
router.get("/:memberId", async (req, res) => {
  try {
    const { memberId } = req.params;

    const member = await Member.findById(memberId);
    if (!member) return res.status(404).json({ error: "Member not found" });

    // Fetch messages for this member
    const messages = await Message.find({ memberId });
    console.log("Number of messages:", messages.length);

    // Initialize metrics for all roles
    let medicalHours = 0;
    let nutritionHours = 0;
    let ptHours = 0;
    let performanceHours = 0;
    let conciergeHours = 0;
    let strategyHours = 0;
    let eventsCount = 0;

    messages.forEach(msg => {
      const sender = msg.sender?.trim().toLowerCase();
      console.log("Processing sender:", sender);

      switch (sender) {̥
        case "dr. warren (medical strategist)":
          medicalHours += 5 / 60;
          break;
        case "carla (nutritionist)":
          nutritionHours += 5 / 60;
          break;
        case "rachel (pt)":
          ptHours += 5 / 60;
          break;
        case "advik (performance scientist)":
          performanceHours += 5 / 60;
          break;
        case "ruby (concierge)":
          conciergeHours += 5 / 60;
          break;
        case "neel (concierge lead / relationship manager)":
          strategyHours += 5 / 60;
          break;
      }

      if (msg.content?.toLowerCase().includes("event")) eventsCount++;
    });

    console.log("Metrics calculated:", {
      medicalHours,
      nutritionHours,
      ptHours,
      performanceHours,
      conciergeHours,
      strategyHours,
      eventsCount
    });

    res.json({
      name: member.name,
      chronicCondition: member.chronicCondition,
      metrics: {
        medicalHours: medicalHours.toFixed(2),
        nutritionHours: nutritionHours.toFixed(2),
        ptHours: ptHours.toFixed(2),
        performanceHours: performanceHours.toFixed(2),
        conciergeHours: conciergeHours.toFixed(2),
        strategyHours: strategyHours.toFixed(2),
        eventsCount
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new member
router.post("/", async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

export default router;
