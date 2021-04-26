const User = require('../models/user.model');
const { generateToken } = require('../utils/generateToken');

/**
 * @desc Signup a new user
 * @route POST  /api/v1
 * @access Public
 *
 * @param {*} req
 * @param {*} res
 */
const signupUser = async (req, res) => {
  const { userName, email, password, photoURL } = req.body;
  const userExist = await User.findOne({ email }).exec();

  if (userExist)
    return res.status(400).send('The provided email already exist.');

  const newUser = new User({ userName, email, password, photoURL });

  try {
    await newUser.save();
    return res.json({ ok: true });
  } catch (error) {
    return res.status(400).send('An error occured. Please try again.');
  }
};

// @desc Auth user and get a token
// @route POST /api/v1/signin
// @access Public
const signinUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();
    if (!user) res.status(400).send('Invalid Email or Password');

    if(user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        stripe_account_id: user.stripe_account_id,
        stripe_seller: user.stripe_seller,
        stripe_session: user.stripe_session,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send('Invalid Email or Password!');
    }
  } catch (error) {
    res.status(401).send('Invalid Email or Password');
  }
};

module.exports = {
  signupUser,
  signinUser,
};
