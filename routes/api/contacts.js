const express = require("express");
const router = express.Router();
const { contactsControllers } = require("../../controllers");
const {
  addContactSchemaJoi,
  updateFavoriteSchemaJoi,
} = require("../../models");
const { validateBody } = require("../../decorators");
const { isValidId } = require("../../middlewares");

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", isValidId, contactsControllers.getContactById);

router.post(
  "/",
  validateBody(addContactSchemaJoi),
  contactsControllers.addContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(addContactSchemaJoi),
  contactsControllers.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchemaJoi),
  contactsControllers.updateStatusContact
);

router.delete("/:contactId", isValidId, contactsControllers.removeContactById);

module.exports = router;
