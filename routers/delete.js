const express = require('express');
const deleter = express.Router();

const deleteFile = require("../deletFile");


deleter.use(express.json());



deleter.delete("/delete", (_, res) => {
    deleteFile(process.argv[2], 0).then((response) => {
    deleteFile(process.argv[2], 0)
        .then((response) => {
            res.write('This is the list of our books after deleting\n');
            res.write(JSON.stringify(response));
        })
        .catch((error) => {
            res.write(error.message);
        })
        .finally(() => {
            res.end();
        });
    })
});

module.exports = deleter;