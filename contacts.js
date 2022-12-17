const fs = require('fs').promises


const PATH = './db/contacts.json';

async function getDataFromFile() {
    try {        
        const data = await fs.readFile(PATH, 'utf8');
        const contacts = JSON.parse(data);
        return contacts;
	} catch (err) {
		console.log('\x1b[1;31;44mне могу прочитать файл контактов\x1b[0m', err);
	}
}
async function writeDataInFile(data) {
    try {  
        const contacts = JSON.stringify(data);      
        await fs.writeFile(PATH, contacts);        
	} catch (err) {
		console.log('\x1b[1;31;44mне смог записать контакты\x1b[0m', err);
	}
}


async function listContacts() {
  	try {        
        const contacts = await getDataFromFile();
        console.table(contacts);   
	} catch (err) {
		console.log('\x1b[1;31;44mчто-то не читается файл контактов или он отсутствует\x1b[0m', err);
	}
}

async function getContactById(id) {
    try {  
        const contacts = await getDataFromFile();
        const result = [contacts.find(el=>el.id===id)];
        if (result.length !== 0) {
            console.table (result)
        } else {
            console.log (`\x1b[1;31;44mзаписей с id:${id} не найденно\x1b[0m`)
        }
    } catch (err) {
        console.log('\x1b[1;31;44mпроблемки....\x1b[0m', err);
    }
}

async function removeContact(id) {
    try {  
        const contacts = await getDataFromFile();
        const index = contacts.findIndex(el => el.id === id);
        if (index!== -1){
            contacts.splice(index,1);
            writeDataInFile(contacts);
        }else { 
            console.log(`\x1b[1;31;44mконтак с id:${id} не существует\x1b[0m`)
        }
    } catch (err) {
        console.log('\x1b[1;31;44mпроблемки....\x1b[0m', err);
    }
}

async function addContact(name, email, phone) {
    const contacts = await getDataFromFile();
    const ids = contacts.map(el => el.id).sort((a, b) => a - b).reverse();
    const id = String(+ids[0] + 1);
    contacts.push({id, name, email, phone});
    writeDataInFile(contacts);    
}
module.exports = {
    list: listContacts,
    getById: getContactById,
    remove: removeContact,
    add: addContact,
}