const readFile = require('./readfile.js');
const fs = require('fs/promises');

const editFile = async (filePath, data, bookID) => {
    let buffer = await readFile(filePath);
    buffer[bookID] = (buffer.length + ", " + data);
    try {
        await fs.writeFile(filePath, buffer.join('\n'));
    } catch (error) {
        throw new Error('Error updating file');
    }
    return await readFile(filePath);

}
module.exports = editFile;