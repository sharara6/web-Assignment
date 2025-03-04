const express = require('express');
const retrunn = express.Router();

const editFile = require('../editFile');
retrunn.use(express.json());

retrunn.put("/edit", (req, res) => {

    editFile(process.argv[2], "Edited", 2 , 0).then((response) => {
      res.write('This is the list of our books after returning\n');
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

retrunn.use(express.json());