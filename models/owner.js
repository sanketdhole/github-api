const Sequalize = require("sequelize");

const sequalize = require("../utils/db");

const Owner = sequalize.define(
  "owner",
  {
    id: {
      type: Sequalize.INTEGER,
      primaryKey: true,
      unique: true,
    },
    avatar_url: Sequalize.STRING,
    html_url: Sequalize.STRING,
    type: Sequalize.STRING,
  },
  { timestamps: false }
);

module.exports = Owner;
