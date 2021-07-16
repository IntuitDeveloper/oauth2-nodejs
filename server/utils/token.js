/* eslint-disable import/prefer-default-export */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require("../config.json")

module.exports = jwtToken = {
  createToken(payload) {
    return jwt.sign(
      payload,
      config.JWT_SECRET || '',
      { expiresIn: 30000 }
    );
  },
  verifyToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '24h' });
    return decoded;
  }
};

module.exports = hashPassword = (password) => bcrypt.hash(password, 10);
module.exports = comparePassword = (password, hash) => bcrypt.compare(password, hash);