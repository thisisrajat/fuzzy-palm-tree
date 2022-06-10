/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("upvotes", (table) => {
    table.increments("id").primary();
    table
      .integer("voter_id")
      .notNullable()
      .index()
      .references("id")
      .inTable("users");
    table
      .integer("comment_id")
      .notNullable()
      .index()
      .references("id")
      .inTable("comments");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("upvotes");
};
