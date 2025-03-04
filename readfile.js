const fs = require('fs/promises');

const readFile = async (filePath) => {
    let buffer;
    try {
        buffer = await fs.readFile(filePath);
    } catch (error) {
        throw new Error('Error reading file');
    }
const data = buffer
    .toString()
    .trim()
    .split('\n')
    .map((line) =>line.trim().split(','))

return data;
}

module.exports = readFile;