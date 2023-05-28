const express = require("express");
const router = express.Router();
const contactsServices = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const result = await contactsServices.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServices.getContactById(contactId);
    if (!result) {
      const error = new Error(`Contact with id: ${contactId} is not found`);
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
