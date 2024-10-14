const express = require('express');
const { createField, getFields } = require('../controllers/fieldController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes for fields
router.post('/create', authMiddleware, createField);
router.get('/', getFields);

module.exports = router;
