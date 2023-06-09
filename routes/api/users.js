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
const upload = require("../../middlewares/upload");

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
  usersControllers.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatars"),
  (req, rew, next) => {
    console.log("working");
    next();
  },
  usersControllers.updateAvatar
);

module.exports = router;
