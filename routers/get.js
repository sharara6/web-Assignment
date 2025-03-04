const express = require('express');
const reader = express.Router();

const readFile = require('../readfile');


reader.use(express.json());


reader.get('/', (req, res) => {

    readFile(process.argv[2])
    .then((response) => {
      res.write('This is the list of our books\n');
      res.write(JSON.stringify(response));
    })
    .catch((error) => {
      res.write(error.message);
    })
    .finally(() => {
      res.end();
    });}
);


module.exports = reader