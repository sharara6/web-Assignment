const readFile = require('./readfile.js');
const fs = require('fs/promises');

const editFile = async (filePath, data, bookID, isBorrowed) => {
    let buffer = await readFile(filePath);
    var borrowed = "";
    if (isBorrowed == 1){
        borrowed = "borrowed";
    }
    else{
        borrowed = "not borrowed";
    }
    buffer[bookID] = (buffer.length + ", " + data + ", Scott Snyder" + ", " + borrowed);
    try {
        await fs.writeFile(filePath, buffer.join('\n'));
    } catch (error) {
        throw new Error('Error updating file');
    }
    return await readFile(filePath);

}
module.exports = editFile;