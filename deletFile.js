const readFile = require('./readfile.js');
const fs = require('fs/promises');

const deleteFile = async (filePath, bookID) => {
    let buffer = await readFile(filePath);
    buffer.splice(bookID, 1);
    try {
        await fs.writeFile(filePath, buffer.join('\n'));
    } catch (error) {
        throw new Error('Error deleting file');
    }
    return await readFile(filePath);

}
module.exports = deleteFile;