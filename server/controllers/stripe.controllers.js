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
  console.log(link);
  res.send(link);
};

const updateDelayPayoutDays = async (account_id) => {
  const account = await stripe.accounts.update(account_id, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 8,
        },
      },
    },
  });
  return account;
};

const getUserStripeAccountStatus = async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  const stripeAccount = await stripe.accounts.retrieve(user.stripe_account_id);
  const updatedStripeAccount = await updateDelayPayoutDays(stripeAccount.id);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: updatedStripeAccount,
    },
    { new: true }
  )
    .select('-password')
    .exec();

  res.json(updatedUser);
};

const getUserStripeAccountBalance = async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  try {
    const userBalance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    res.json(userBalance);
  } catch (error) {
    console.log(error);
  }
};

const payOutSettings = async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  try {
    const userLoginLink = await stripe.accounts.createLoginLink(user.stripe_seller.id, {
      redirect_url: process.env.STRIPE_PAYOUT_SETTINGS_REDIRECT_URL
    });
    res.json(userLoginLink);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  stripeConnectAccount,
  getUserStripeAccountStatus,
  updateDelayPayoutDays,
  getUserStripeAccountBalance,
  payOutSettings,
};
