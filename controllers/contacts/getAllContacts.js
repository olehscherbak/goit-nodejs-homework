const { Contact } = require("../../models");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let findObj = { owner };
  if (favorite) {
    findObj = { ...findObj, favorite: favorite === "true" };
  }
  console.log(findObj);
  const result = await Contact.find(findObj, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(result);
};

module.exports = getAllContacts;
