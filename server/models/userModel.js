const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Username is required']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Username is required']
  },
  username: {
    type: String,
    trim: true,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, 'Username is required']
  },
  password:{
    type: String,
    required: [true, 'Password is required']
  },
  details:{
    company: {
      type: String,
      trim: true,
      required: true
    },
    mobile: {
      type: Number,
      required: true
    },
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  created:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Users', userSchema)

