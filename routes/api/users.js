const express = require("express");
const router = express.Router();
const { validateBody } = require("../../decorators");
const { registerSchemaJoi, loginSchemaJoi } = require("../../models");
const { usersControllers } = require("../../controllers");

router.post(
  "/register",
  validateBody(registerSchemaJoi),
  usersControllers.register
);

router.post("/login", validateBody(loginSchemaJoi), usersControllers.login);

module.exports = router;
