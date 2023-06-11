const {
  Contact,
  addContactSchemaJoi,
  updateFavoriteSchemaJoi,
} = require("./contact");

const {
  User,
  registerSchemaJoi,
  loginSchemaJoi,
  emailSchemaJoi,
  updateSubscriptionJoi,
} = require("./user");

module.exports = {
  Contact,
  addContactSchemaJoi,
  updateFavoriteSchemaJoi,
  User,
  registerSchemaJoi,
  loginSchemaJoi,
  emailSchemaJoi,
  updateSubscriptionJoi,
};
