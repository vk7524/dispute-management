const Dispute = require("../models/Dispute");
const User = require("../models/User");
const { sendTeamsNotification } = require("../services/notificationService");

const createDispute = async (req, res) => {
    try {
        const { assigneeId, assigneeName, assigneeEmail } = req.body;
        let resolvedAssigneeName = assigneeName;
        let resolvedAssigneeEmail = assigneeEmail;

        if (assigneeId) {
            const assignee = await User.findById(assigneeId);

            if (!assignee) {
                return res.status(404).json({
                    success: false,
                    message: "Assignee not found"
                });
            }

            resolvedAssigneeName = assignee.name;
            resolvedAssigneeEmail = assignee.email;
        }

        if (!resolvedAssigneeEmail) {
            return res.status(400).json({
                success: false,
                message: "Assignee email is required"
            });
        }

        const ticketNumber =
            "DSP-" + Date.now();

        const dispute = await Dispute.create({
            ...req.body,
            assigneeName: resolvedAssigneeName,
            assigneeEmail: resolvedAssigneeEmail,
            ticketNumber,
            statusHistory: [
                {
                    status: "Open",
                    updatedBy: "System"
                }
            ]
        });

        await sendTeamsNotification(dispute);

        res.status(201).json({
            success: true,
            data: dispute
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getAllDisputes = async (req, res) => {
    try {
        const disputes = await Dispute.find()
            .populate("assigneeId", "name email")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: disputes.length,
            data: disputes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getDisputeById = async (req, res) => {
    try {
        const dispute = await Dispute.findById(req.params.id)
            .populate("assigneeId", "name email");

        if (!dispute) {
            return res.status(404).json({
                success: false,
                message: "Dispute not found",
            });
        }

        res.json({
            success: true,
            data: dispute,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateDisputeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const dispute = await Dispute.findById(id);

        if (!dispute) {
            return res.status(404).json({
                success: false,
                message: "Dispute not found",
            });
        }

        dispute.status = status;

        await dispute.save();

        res.json({
            success: true,
            message: "Status Updated",
            data: dispute,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const reassignDispute = async (req, res) => {
    try {
        const { id } = req.params;
        const { assigneeId } = req.body;

        const dispute = await Dispute.findById(id);

        if (!dispute) {
            return res.status(404).json({
                success: false,
                message: "Dispute not found",
            });
        }
        const user = await User.findById(assigneeId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        dispute.assigneeId = assigneeId;
        dispute.assigneeName = user.name;
        dispute.assigneeEmail = user.email;

        await dispute.save();

        const updatedDispute = await Dispute.findById(id)
            .populate("assigneeId", "name email team");

        res.json({
            success: true,
            message: "Ticket reassigned successfully",
            data: updatedDispute,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const resolveDispute = async (req, res) => {
    try {

        const { id } = req.params;
        const { resolvedBy } = req.body;

        const dispute = await Dispute.findById(id);

        if (!dispute) {
            return res.status(404).json({
                success: false,
                message: "Dispute not found"
            });
        }

        dispute.status = "Resolved";
        dispute.resolvedAt = new Date();
        dispute.resolvedBy = resolvedBy;

        await dispute.save();

        res.json({
            success: true,
            message: "Dispute resolved successfully",
            data: dispute
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const escalateDispute = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            escalatedBy,
            escalationReason
        } = req.body;

        const dispute = await Dispute.findById(id);

        if (!dispute) {
            return res.status(404).json({
                success: false,
                message: "Dispute not found"
            });
        }

        dispute.status = "Escalated";
        dispute.priority = "High";

        dispute.escalatedAt = new Date();
        dispute.escalatedBy = escalatedBy;
        dispute.escalationReason = escalationReason;

        await dispute.save();

        res.json({
            success: true,
            message: "Ticket escalated successfully",
            data: dispute
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createDispute,
    getAllDisputes,
    getDisputeById,
    updateDisputeStatus,
    reassignDispute,
    resolveDispute,
    escalateDispute
};