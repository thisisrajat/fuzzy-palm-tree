const db = require("../helpers/database_connection");

const tableName = "users";

const findById = async (id) => {
  if (!id) {
    throw new Error("ID is required");
  }
  if (Array.isArray(id)) {
    return await db.select("*").from(tableName).whereIn("id", id);
  } else {
    const user = await db.select("*").from(tableName).where({ id });
    return user[0];
  }
};

module.exports = {
  tableName,
  findById,
};
