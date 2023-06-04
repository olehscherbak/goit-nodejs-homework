const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} is not found`);
  }
  res.json(result);
};

module.exports = updateContactById;
