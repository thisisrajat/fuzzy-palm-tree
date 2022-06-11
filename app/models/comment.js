const db = require("../helpers/database_connection");

const tableName = "comments";

const create = async ({ text, author_id, parent_comment_id }) => {
  if (!author_id) {
    throw new Error("ID is required");
  }
  if (!text) {
    throw new Error("Text is required");
  }

  try {
    await db.into(tableName).insert({
      text,
      author_id,
      parent_comment_id,
    });
    return true;
  } catch (err) {
    throw err;
  }
};

const findById = async (id) => {
  if (!id) {
    throw new Error("ID is required");
  }
  if (Array.isArray(id)) {
    return await db
      .select("*")
      .from(tableName)
      .whereIn("id", id)
      .orderBy("created_at", "desc");
  } else {
    const comment = await db.select("*").from(tableName).where({ id });
    return comment[0];
  }
};

const findAll = async () => {
  try {
    const comments = await db
      .select("*")
      .from(tableName)
      .orderBy("created_at", "desc");
    return comments;
  } catch (err) {
    throw err;
  }
};

const findAllTopLevel = async () => {
  try {
    const comments = await db
      .select("*")
      .from(tableName)
      .whereNull("parent_comment_id")
      .orderBy("created_at", "desc");
    return comments;
  } catch (err) {
    throw err;
  }
};

const findAllReplies = async () => {
  try {
    const comments = await db
      .select("*")
      .from(tableName)
      .whereNotNull("parent_comment_id")
      .orderBy("created_at", "desc");
    return comments;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  tableName,
  create,
  findAll,
  findById,
  findAllTopLevel,
  findAllReplies,
};
