const express = require('express');
const app = express();

const readFile = require('./readfile.js');
const writeFile = require('./writeFile.js');
const editFile = require('./editFile.js');
const deleteFile = require('./deletFile.js');

const port = process.env.PORT || 1245;

app.use(express.json()); // Added middleware for JSON parsing


app.get('/', (req, res) => {

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

app.post("/add", (req, res) => {
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

app.put("/edit", (req, res) => {

  editFile(process.argv[2], "Edited", 2).then((response) => {
    res.write('This is the list of our books after editing\n');
    res.write(JSON.stringify(response));
  })
  .catch((error) => {
    res.write(error.message);
  })
  .finally(() => {
        res.end();
    })
});

app.delete("/delete", (req, res) => {

    deleteFile(process.argv[2], 0).then((response) => {
        res.write('This is the list of our books after deleting\n');
        res.write(JSON.stringify(response));
    })
    .catch((error) => {
        res.write(error.message);
    })
    .finally(() => {
        res.end();
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
