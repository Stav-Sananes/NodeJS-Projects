const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const {
  BadRequestError,
  UnauthenticatedError,
} = require('../errors/bad-request');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
  const user = await User.create({ ...tempUser });
  const token = jwt.sign({ userId: user_id, name: user.name }, 'jwtSecret', {
    expiresIn: '30d',
  });
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('invalid credentials');
  }
  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new UnauthenticatedError('invalid credentials');
  }
  const token = user.createJWT();
  res.stauts(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
