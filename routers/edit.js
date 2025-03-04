const express = require('express');
const editor = express.Router();

const editFile = require('../editFile');
editor.use(express.json());

editor.put("/edit", (req, res) => {

    editFile(process.argv[2], "Edited", 2 , 1).then((response) => {
      res.write('This is the list of our books after editing\n');
      res.write(JSON.stringify(response));
      console.log(`[${new Date().toISOString()}]${req.method} request received to ${req.url}`);
      next();
    })
    .catch((error) => {
      res.write(error.message);
    })
    .finally(() => {
          res.end();
      })
  });

module.exports = editor;