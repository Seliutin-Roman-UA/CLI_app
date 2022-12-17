const contacts = require('./contacts.js');
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case "list":
        contacts.list();
        break;
  
      case "get":
        contacts.getById(id)
        break;
  
      case "add":
        if(name && email && phone) {
            contacts.add(name, email, phone);
        } else {
            console.log ('\x1b[1;31;44mНедостаточно данных. Корректно введите значения\x1b[0m');
        }       
        break;
  
      case "remove":
        if(id) {
            contacts.remove(id);
        } else {
            console.log ('\x1b[1;31;44mВведите id контакта\x1b[0m');
        }      
        break;
  
      default:
        console.warn("\x1b[1;31;44mUnknown action type!\x1b[0m");
    }
  }
  
  invokeAction(program.opts());
