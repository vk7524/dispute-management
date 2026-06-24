const express = require("express");
const { getAccessToken } = require("../services/graphService");
const axios = require("axios");
const router = express.Router();

router.get("/test", async (req, res) => {
  try {
    const token = await getAccessToken();

    res.json({
      success: true,
      tokenReceived: !!token,
      tokenLength: token.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.response?.data ||
        error.message,
    });
  }
});
router.get("/user/:email", async (req, res) => {
  try {
    const token = await getAccessToken();

    const response = await axios.get(
      `https://graph.microsoft.com/v1.0/users/${req.params.email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.response?.data ||
        error.message,
    });
  }
});

module.exports = router;