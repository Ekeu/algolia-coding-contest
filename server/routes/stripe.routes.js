const express = require('express');

const router = express.Router();

const { stripeConnectAccount, getUserStripeAccountStatus } = require('../controllers/stripe.controllers');
const { jwtCheck } = require('../middlewares/jwtCheck')

router.route('/stripe/connect').post(jwtCheck, stripeConnectAccount);
router.route('/stripe/status').post(jwtCheck, getUserStripeAccountStatus);

module.exports = router;
