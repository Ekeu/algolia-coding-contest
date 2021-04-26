const express = require('express');

const router = express.Router();

const {
  stripeConnectAccount,
  getUserStripeAccountStatus,
  getUserStripeAccountBalance,
  payOutSettings
} = require('../controllers/stripe.controllers');
const { jwtCheck } = require('../middlewares/jwtCheck');

router.route('/stripe/connect').post(jwtCheck, stripeConnectAccount);
router.route('/stripe/status').post(jwtCheck, getUserStripeAccountStatus);
router.route('/stripe/balance').post(jwtCheck, getUserStripeAccountBalance);
router.route('/stripe/settings').post(jwtCheck, payOutSettings);

module.exports = router;
