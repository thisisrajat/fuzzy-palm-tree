const db = require("../helpers/database_connection");

const tableName = "upvotes";

const create = async ({ voter_id, comment_id }) => {
  if (!voter_id) {
    throw new Error("Voter ID is required");
  }
  if (!comment_id) {
    throw new Error("Comment ID is required");
  }

  try {
    await db.into(tableName).insert({
      voter_id,
      comment_id,
    });
    return true;
  } catch (err) {
    throw err;
  }
};

const findByVoterIdAndCommentId = async ({ voter_id, comment_id }) => {
  if (!voter_id) {
    throw new Error("Voter ID is required");
  }
  if (!comment_id) {
    throw new Error("Comment ID is required");
  }
  const votes = await db
    .select("*")
    .from(tableName)
    .where({ voter_id, comment_id });

  return votes[0];
};

const destroy = async ({ voter_id, comment_id }) => {
  if (!voter_id) {
    throw new Error("Voter ID is required");
  }
  if (!comment_id) {
    throw new Error("Comment ID is required");
  }
  await db.select("*").from(tableName).where({ voter_id, comment_id }).del();
  return true;
};

const fetchGroupedByCommentIds = async () => {
  const votes = await db
    .select("comment_id", db.raw("COUNT(*)"))
    .from(tableName)
    .groupBy("comment_id");

  return votes;
};

const fetchByUserId = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const votes = await db
    .select("*")
    .from(tableName)
    .where({ voter_id: userId });

  return votes;
};

module.exports = {
  create,
  destroy,
  findByVoterIdAndCommentId,
  fetchGroupedByCommentIds,
  fetchByUserId,
};
