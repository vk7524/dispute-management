const express = require("express");

const {
    createDispute,
    getAllDisputes,
    getDisputeById,
    updateDisputeStatus,
    reassignDispute,
    resolveDispute,
    escalateDispute
} = require("../controllers/disputeController");

const router = express.Router();
router.post("/", createDispute);
router.get("/", getAllDisputes);
router.get("/:id", getDisputeById);
router.put("/:id/status", updateDisputeStatus);
router.put("/:id/reassign", reassignDispute);
router.put("/:id/resolve", resolveDispute);
router.put("/:id/escalate", escalateDispute);

module.exports = router;