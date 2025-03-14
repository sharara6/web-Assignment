const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Author routes
router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthor);
router.post('/', authorController.createAuthor);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

module.exports = router; 