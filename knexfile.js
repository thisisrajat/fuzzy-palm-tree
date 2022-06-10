module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./ghost.db",
    },
    useNullAsDefault: true,
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./ghost.db",
    },
    useNullAsDefault: true,
  },
};
