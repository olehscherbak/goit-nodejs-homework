const express = require("express");
const router = express.Router();
const contactsControllers = require("../../controllers/contacts-controllers");
const schemas = require("../../schemas/contactsSchemas");
const { validateBody } = require("../../decorators");

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", contactsControllers.getContactById);

router.post(
  "/",
  validateBody(schemas.contactSchema),
  contactsControllers.addContact
);

router.put(
  "/:contactId",
  validateBody(schemas.contactSchema),
  contactsControllers.updateContactById
);

router.delete("/:contactId", contactsControllers.removeContactById);

module.exports = router;
