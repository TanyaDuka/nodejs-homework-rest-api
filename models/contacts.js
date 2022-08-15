const fs = require('fs/promises');
const path = require('path');
 const {v4} = require('uuid')

const contactsFile=path.join(__dirname,'contacts.json')

const listContacts = async () => {
  const contacts = await fs.readFile(contactsFile);
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);

  if (result === -1) {
    return null;
  }
  return result;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      return null;
    }
  const newContacts = contacts.filter((_, index) => index !== idx);
  
  await fs.writeFile(contactsFile, JSON.stringify(newContacts));
  
    return contacts[idx];
}

const addContact = async ({name, email, phone}) => {
   const contacts = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone
  };

  contacts.push(newContact);
  await fs.writeFile(contactsFile, JSON.stringify(contacts, null, 2));
  return newContact;

}

const updateContact = async (contactId, {name,email,phone}) => {
  const contacts = await listContacts();
  
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
        return null;
    }
    contacts[idx] = {contactId, name, email, phone};
     await fs.writeFile(contactsFile, JSON.stringify(contacts, null, 2));
    return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
