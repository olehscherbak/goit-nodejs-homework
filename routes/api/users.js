const express = require("express");
const router = express.Router();
const { validateBody } = require("../../decorators");
const {
  registerSchemaJoi,
  loginSchemaJoi,
  emailSchemaJoi,
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
  usersControllers.updateAvatar
);

router.get("/verify/:verificationToken", usersControllers.verify);

router.post(
  "/verify",
  validateBody(emailSchemaJoi),
  usersControllers.resendVerifyEmail
);

module.exports = router;
