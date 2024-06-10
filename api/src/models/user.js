const { mongoose } = require('../config/dbConnection');
const passwordCrypto = require('../helper/passwordCrypto');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    set: (password) => passwordCrypto(password)
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: email => `${email.value} is not a valid email format`
    }
  },
  firstName: String,
  lastName: String,
  isActive: {
    type: Boolean,
    default: true
  },
  isStaff: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: String,
    default: false
  }
}, {
  collection: "users",
  timestamps: true
});

module.exports = mongoose.model("Users", userSchema);