const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contactList = await fs.readFile(contactsPath, "utf-8");
  const parseContactList = JSON.parse(contactList);
  console.table(parseContactList);
  return parseContactList;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const resultContact = allContacts.find((item) => item.id === contactId);
  console.log(resultContact);
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };

  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  console.log(`Contact ${name} has been added to the list`);
  console.table(allContacts);
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  console.log(`Contact with id ${contactId} has been removed`);
  console.table(allContacts);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
