const express = require("express");
const router = express.Router();
const { validateBody } = require("../../decorators");
const {
  registerSchemaJoi,
  loginSchemaJoi,
  updateSubscriptionJoi,
} = require("../../models");
const { usersControllers } = require("../../controllers");
const authenticate = require("../../middlewares/authenticate");

router.post(
  "/register",
  validateBody(registerSchemaJoi),
  usersControllers.register
);

router.post("/login", validateBody(loginSchemaJoi), usersControllers.login);

router.get("/current", authenticate, usersControllers.current);

router.post("/logout", authenticate, usersControllers.logout);

router.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionJoi),
  usersControllers.subscriptionUpdate
);

module.exports = router;
