const DisputeComment = require("../models/DisputeComment");

const addComment = async (req, res) => {
    try {

        const { id } = req.params;

        const newComment =
            await DisputeComment.create({
                disputeId: id,
                ...req.body
            });

        res.status(201).json({
            success: true,
            data: newComment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getComments = async (req, res) => {

    try {

        const comments =
            await DisputeComment.find({
                disputeId: req.params.id
            })
            .sort({ createdAt: 1 });

        res.json({
            success: true,
            count: comments.length,
            data: comments
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addComment,
    getComments
};