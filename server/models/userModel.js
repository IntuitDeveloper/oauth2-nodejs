const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  password:{
    type: String,
    required: [true, 'Password is required']
  },
  created: {
    type: Date,
    required: [true, 'Created date is required']
  }
})

module.exports = mongoose.model('Users', userSchema)
// module.exports = userSchema