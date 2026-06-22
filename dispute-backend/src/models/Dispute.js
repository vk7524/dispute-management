const mongoose = require("mongoose");

const disputeSchema = new mongoose.Schema(
    {
        ticketNumber: {
            type: String,
            required: true
        },

        customerCode: {
            type: String,
            required: true
        },

        invoiceId: {
            type: String
        },
        invoice: {
            type: String,
            required: true
        },

        reasonCode: {
            type: String,
            required: true
        },

        description: String,

        ownerTeam: {
            type: String,
            required: true
        },

        assigneeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        assigneeName: {
            type: String,
            required: true
        },

        assigneeEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        priority: {
            type: String,
            default: "Medium"
        },

        targetResolutionDate: Date,

        customerImpact: String,
        attachments: [
            {
                fileName: String,
                fileUrl: String
            }
        ],

        status: {
            type: String,
            default: "Open"
        },
        statusHistory: [
            {
                status: String,
                updatedBy: String,
                updatedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        resolvedAt: {
            type: Date
        },
        resolvedBy: {
            type: String
        },
        escalatedAt: {
            type: Date
        },
        escalatedBy: {
            type: String
        },
        escalationReason: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Dispute", disputeSchema);