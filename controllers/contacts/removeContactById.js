const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const removeContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} is not found`);
  }
  res.status(204).send();
};

module.exports = removeContactById;
