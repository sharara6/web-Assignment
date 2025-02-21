const readFile = require('./readfile.js');
const fs = require('fs/promises');

const writeFile = async (filePath, data) => {
    let buffer = await readFile(filePath);
    buffer.push(buffer.length + ", " + data);

    try {
        await fs.writeFile(filePath, buffer.join('\n'));
    } catch (error) {
        throw new Error('Error writing file');
    }
    return await readFile(filePath);
}
module.exports = writeFile;