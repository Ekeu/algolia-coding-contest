const express = require('express');

const router = express.Router();

const { signupUser, signinUser } = require('../controllers/user.controllers');

router.route('/').post(signupUser);
router.route('/signin').post(signinUser);

module.exports = router;
