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

const addContact = async (name, email, phone) => {
  const argList = [...arguments];
  const argsValid = argList.every((argument) => Boolean(argument));

  if (!argsValid) {
    const error = new Error("Required arguments are missed");
    error.status = 400;
    throw error;
  }
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const list = await listContacts();
  list.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
