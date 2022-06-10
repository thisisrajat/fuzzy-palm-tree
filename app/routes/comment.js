const express = require("express");
const CommentDataService = require("../services/comment_data_service");

const setUser = require("../middlewares/set_user");

const router = express.Router();

router.get("/", setUser, async (req, res) => {
  const { currentUser } = req;

  const comments = await CommentDataService.buildData({
    userId: currentUser.id,
  });

  res.render("comment_listing", { user: currentUser, comments });
});

module.exports = router;
