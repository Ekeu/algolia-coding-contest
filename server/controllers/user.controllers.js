const User = require('../models/user.model');

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
    console.log('Created user ==> ', newUser);
    return res.json({ ok: true });
  } catch (error) {
    console.log('User creation failed ==> ', error.message);
    return res.status(400).send('An error occured. Please try again.');
  }
};

module.exports = {
  signupUser,
};
