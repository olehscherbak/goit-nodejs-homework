const express = require("express");
const router = express.Router();
const joi = require("joi");
const contactsServices = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const contactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const result = await contactsServices.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServices.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id: ${contactId} is not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contactsServices.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServices.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id: ${contactId} is not found`);
    }
    res.status(204).json(result);
    console.log(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsServices.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id: ${contactId} is not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
