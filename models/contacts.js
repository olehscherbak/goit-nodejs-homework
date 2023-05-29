const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const result = list.find((item) => contactId === item.id);
  return result || null;
};

const removeContact = async (contactId) => {
  const list = await listContacts();
  const index = list.findIndex((item) => contactId === item.id);
  if (index !== -1) {
    const [result] = list.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(list));
    return result;
  }
  return null;
};

const addContact = async (body) => {
  const list = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };

  list.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const list = await listContacts();
  const index = list.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  list[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(list));
  return list[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
