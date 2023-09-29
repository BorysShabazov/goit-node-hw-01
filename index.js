const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);

    case "get":
      const contact = await contacts.getContactById(id);
      return console.log(contact);

    case "remove":
      const contactDel = await contacts.removeContact(id);
      return console.log(contactDel);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    default:
      console.warn("Unknown action type!");
  }
};

invokeAction(argv);
