const express = require("express");
const Team = require("../models/Team");

const router = express.Router();

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