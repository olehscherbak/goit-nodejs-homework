const express = require("express");
const router = express.Router();
const { contactsControllers } = require("../../controllers");
const {
  addContactSchemaJoi,
  updateFavoriteSchemaJoi,
} = require("../../models");
const { validateBody } = require("../../decorators");
const { isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, contactsControllers.getAllContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsControllers.getContactById
);

router.post(
  "/",
  authenticate,
  validateBody(addContactSchemaJoi),
  contactsControllers.addContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(addContactSchemaJoi),
  contactsControllers.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchemaJoi),
  contactsControllers.updateStatusContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsControllers.removeContactById
);

module.exports = router;
