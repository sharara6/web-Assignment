const express = require('express');
const app = express();

const port = process.env.PORT || 1245;

app.use(express.json());

const userRoutes = require("./routers/get.js");
const AddBook = require("./routers/add.js");
const editBook = require("./routers/edit.js");
const deleteBook = require("./routers/delete.js");

const authentacetor = (req, res, next) => {
  const authHeadr = req.headers.authorization;
  if (authHeadr != "Bearer Zewail") {
    return res.status(401).send("You are not authorized");
  }
  next();
}

app.use(authentacetor);

app.get('/', userRoutes);

app.post("/add",AddBook);

app.put("/edit", editBook);

app.delete("/delete", deleteBook);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
