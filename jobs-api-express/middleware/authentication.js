const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startWith('Bearer')) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process, env.JWT_SECRET);
    // attach the user to the job
    const user = User.findById(payload.id).select('-password');
    req.user = user;
    req.user = { userId: payload };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

module.exports = auth;
