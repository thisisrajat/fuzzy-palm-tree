const timeago = require("timeago.js");
const Comment = require("../models/comment");
const User = require("../models/user");
const Upvote = require("../models/upvote");

async function buildData({ userId }) {
  const comments = await Comment.findAll();

  /* get all authors */
  const authorIds = comments.map((comment) => comment.author_id);

  const authors = await User.findById(authorIds);

  /* get all upvotes */
  const votes = await Upvote.fetchGroupedByCommentIds();

  /* get all upvotes for current user */
  const userVotes = (await Upvote.fetchByUserId(userId)) || [];

  /* map authors and created_ago to comments */
  const commentsWithAuthors = comments.map((comment) => {
    const author = authors.find((author) => author.id === comment.author_id);
    const upvote = votes.find((vote) => vote.comment_id === comment.id);
    const selfVote = userVotes.find((vote) => vote.comment_id === comment.id);

    return {
      ...comment,
      author,
      created_ago: timeago.format(comment.created_at),
      upvote: upvote && upvote["COUNT(*)"],
      has_user_voted: selfVote,
    };
  });

  return commentsWithAuthors;
}

module.exports = { buildData };
