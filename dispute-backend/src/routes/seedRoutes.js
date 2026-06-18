const express = require("express");
const router = express.Router();

const Team = require("../models/Team");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    await Team.deleteMany();
    await User.deleteMany();

    await Team.insertMany([
      { name: "Finance" },
      { name: "Sales" },
      { name: "Support" },
      { name: "Delivery" },
    ]);

    await User.insertMany([
      {
        name: "Anita Sharma",
        email: "anita@test.com",
        team: "Finance",
      },
      {
        name: "Rahul Gupta",
        email: "rahul@test.com",
        team: "Finance",
      },
      {
        name: "Priya Menon",
        email: "priya@test.com",
        team: "Sales",
      },
      {
        name: "Vikram Joshi",
        email: "vikram@test.com",
        team: "Support",
      },
    ]);

    res.json({
      success: true,
      message: "Seed Data Added",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;