/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("comments", (table) => {
    table
      .integer("parent_comment_id")
      .index()
      .references("id")
      .inTable("comments")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("comments", (table) => {
    table.dropColumn("parent_comment_id");
  });
};
