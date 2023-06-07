const { ctrlWrapper } = require("../../decorators");

const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const subscriptionUpdate = require("./subscriptionUpdate");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
};
