const { Schema, model } = require("mongoose");
const joi = require("joi");
const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);
const Contact = model("contact", contactSchema);

const addContactSchemaJoi = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
  favorite: joi.boolean(),
});

const updateFavoriteSchemaJoi = joi.object({
  favorite: joi.boolean().required(),
});

const schemasJoi = {
  addContactSchemaJoi,
  updateFavoriteSchemaJoi,
};

module.exports = {
  Contact,
  schemasJoi,
};
