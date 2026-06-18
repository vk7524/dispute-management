const mongoose = require("mongoose");

const disputeCommentSchema = new mongoose.Schema(
{
    disputeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dispute",
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    teamName: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model(
    "DisputeComment",
    disputeCommentSchema
);