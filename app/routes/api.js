const express = require("express");
const Comment = require("../models/comment");
const Upvote = require("../models/upvote");

const router = express.Router();

router.post("/api/comment", async (req, res) => {
  const { comment, user_id } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "Comment is required" });
  }

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const insertableData = {
    author_id: user_id,
    text: comment,
  };

  await Comment.create(insertableData);

  res.json({
    message: "Comment created successfully",
  });
});

router.post("/api/comment/:comment_id/upvote", async (req, res) => {
  const { comment_id } = req.params;
  const { user_id: voter_id } = req.body;

  if (!comment_id) {
    return res.status(400).json({ error: "Comment ID is required" });
  }

  if (!voter_id) {
    return res.status(400).json({ error: "Voter ID is required" });
  }

  // Check if comment exists
  const comment = await Comment.findById(comment_id);

  if (!comment || !comment.id) {
    return res.status(400).json({ error: "Comment not found" });
  }

  // Check if user has already upvoted

  const upvote = await Upvote.findByVoterIdAndCommentId({
    voter_id,
    comment_id,
  });

  if (upvote && upvote.id) {
    await Upvote.destroy({ voter_id, comment_id });
    return res.json({
      message: "Upvote removed successfully",
    });
  }

  const insertableData = {
    voter_id,
    comment_id: comment_id,
  };

  await Upvote.create(insertableData);

  res.json({
    message: "Upvote created successfully",
  });
});

module.exports = router;
