const express = require('express');
const app = express();
const port = process.env.PORT || 1245;

app.use(express.json()); // Added middleware for JSON parsing

var books = {"0":"batman","1":"superman","2":"spiderman"};

app.get('/', (req, res) => {
  res.send(Object.values(books));
});

app.post("/add", (req, res) => {
  books[Object.keys(books).length] = "catwoman";
  res.send(Object.values(books));
});

app.put("/edit", (req, res) => {
  books[Object.keys(books).length - 1] = "Edited Book";
  res.send(Object.values(books));
});

app.delete("/delete", (req, res) => {
  delete books[Object.keys(books).length - 1];
  res.send(Object.values(books));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
