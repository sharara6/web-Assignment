const express = require('express');
const adder = express.Router();

const writeFile = require('../writeFile');

adder.use(express.json());


adder.post("/add", (req, res) => {
    writeFile(process.argv[2], "Added").then((response) => {
      res.write('This is the list of our books after adding\n');
      res.write(JSON.stringify(response));
    })
    .catch((error) => {
      res.write(error.message);
    })
    .finally(() => {
      res.end();
    })
  });


module.exports = adder