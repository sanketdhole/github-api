const Sequalize = require("sequelize");

const sequelize = require("../utils/db");

const Repository = sequelize.define(
  "repository",
  {
    id: {
      type: Sequalize.INTEGER,
      unique: true,
      primaryKey: true,
    },
    name: Sequalize.STRING,
    html_url: Sequalize.STRING,
    description: Sequalize.TEXT,
    created_at: Sequalize.DATE,
    open_issues: Sequalize.INTEGER,
    watchers: Sequalize.INTEGER,
  },
  {
    timestamps: false,
  }
);

module.exports = Repository;
