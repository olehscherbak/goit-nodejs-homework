const {
  Contact,
  addContactSchemaJoi,
  updateFavoriteSchemaJoi,
} = require("./contact");

const { User, registerSchemaJoi, loginSchemaJoi } = require("./user");

module.exports = {
  Contact,
  addContactSchemaJoi,
  updateFavoriteSchemaJoi,
  User,
  registerSchemaJoi,
  loginSchemaJoi,
};
