const express = require("express");
const router = express.Router();
const contactsControllers = require("../../controllers/contacts-controllers");
const schemas = require("../../models/contact");
const { validateBody } = require("../../decorators");
const { isValidId } = require("../../middlewares");

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", isValidId, contactsControllers.getContactById);

router.post(
  "/",
  validateBody(schemas.schemasJoi.addContactSchemaJoi),
  contactsControllers.addContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.schemasJoi.addContactSchemaJoi),
  contactsControllers.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.schemasJoi.updateFavoriteSchemaJoi),
  contactsControllers.updateStatusContact
);

router.delete("/:contactId", isValidId, contactsControllers.removeContactById);

module.exports = router;
