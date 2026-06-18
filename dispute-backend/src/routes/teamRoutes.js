const express = require("express");
const Team = require("../models/Team");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();

    res.json({
      success: true,
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/seed-teams", async (req, res) => {
  await Team.deleteMany({});

  await Team.insertMany([
    { name: "Finance" },
    { name: "Sales" },
    { name: "Support" },
    { name: "Delivery" },
  ]);

  res.json({
    success: true,
    message: "Teams Added",
  });
});

module.exports = router;