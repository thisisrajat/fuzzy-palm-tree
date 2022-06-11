const Comment = require("../models/comment");
const User = require("../models/user");
const Upvote = require("../models/upvote");

async function buildData({ userId, commentId }) {
  let comments = [];
  let replies = [];

  if (commentId) {
    comments = await Comment.findById(commentId);
    if (!Array.isArray(comments)) {
      comments = [comments];
    }
  } else {
    comments = await Comment.findAllTopLevel();
    replies = await Comment.findAllReplies();
    replies = await buildData({ userId, commentId: replies.map((c) => c.id) });
  }

  /* get all authors */
  const authorIds = comments.map((comment) => comment.author_id);

  const authors = await User.findById(authorIds);

  /* get all upvotes */
  const votes = await Upvote.fetchGroupedByCommentIds();

  /* get all upvotes for current user */
  const userVotes = (await Upvote.fetchByUserId(userId)) || [];

  /* map authors, upvotes to comments */
  const commentsWithAuthors = comments.map((comment) => {
    const author = authors.find((author) => author.id === comment.author_id);
    const upvote = votes.find((vote) => vote.comment_id === comment.id);
    const selfVote =
      userVotes.findIndex((vote) => vote.comment_id === comment.id) >= 0;
    const commentReplies = replies.filter(
      (reply) => reply.parent_comment_id === comment.id
    );

    return {
      ...comment,
      author,
      upvote: upvote && upvote["COUNT(*)"],
      has_user_voted: selfVote,
      replies: commentReplies,
    };
  });

  return commentsWithAuthors;
}

module.exports = { buildData };
