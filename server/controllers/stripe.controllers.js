const User = require('../models/user.model');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const queryString = require('query-string');

const stripeConnectAccount = async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: 'express',
    });
    user.stripe_account_id = account.id;
    user.save();
  }
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: 'account_onboarding',
  });
  accountLink = Object.assign(accountLink, {
    'stripe_user[email]': user.email || undefined,
  });
  const link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log(link)
  res.send(link);
};

const getUserStripeAccountStatus = async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  const stripeAccount = await stripe.accounts.retrieve(user.stripe_account_id);
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    stripe_seller: stripeAccount,
  }, { new: true }).select('-password')  
};
module.exports = {
  stripeConnectAccount,
  getUserStripeAccountStatus,
};
