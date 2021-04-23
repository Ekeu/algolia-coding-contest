const express = require('express');

const router = express.Router();

const { showMessage } = require('../controllers/user.controllers');

router.get('/:message', showMessage);

module.exports = router;
