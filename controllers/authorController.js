const Author = require('../models/Author');

// Get all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single author
exports.getAuthor = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create author
exports.createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update author
exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    await author.update(req.body);
    res.json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete author
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    await author.destroy();
    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 