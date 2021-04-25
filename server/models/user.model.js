const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: 'User name is a required field',
    },
    email: {
      type: String,
      trime: true,
      required: 'Email is a required field',
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 64,
    },
    photoURL: {
      type: String,
      required: true,
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripe_session: {},
  },
  {
    timestams: true,
  }
);

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre("save", async function(next) {
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema);

module.exports = User;
