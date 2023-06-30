const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../utils/customErrorsClasses/UnauthorizedError');

const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const foundUser = await User.findOne({ email })
      .select('+password');
    if (!foundUser) {
      throw new UnauthorizedError('Неуспешная авторизация');
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Неуспешная авторизация');
    }
    const jwt = jsonWebToken.sign({
      _id: foundUser._id,
    }, process.env.SECRET_TOKEN_KEY);
    res
      .cookie('jwt', jwt, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
    res.status(200).send({ message: 'Аутентификация прошла успешна' });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const createdUser = await User.create({ ...req.body, password: passwordHash });
    const newUser = JSON.parse(JSON.stringify(createdUser));
    const {
      __v,
      password,
      _id,
      ...newUserClear
    } = newUser;
    res.status(201).send(newUserClear);
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send({ data: users });
  } catch (err) {
    next(err);
  }
};

const searchUser = async (userId) => {
  const foundUser = await User.findById(userId)
    .orFail();
  return foundUser;
};

const getUserInfo = async (req, res, next) => {
  try {
    const foundUser = await searchUser(req.user._id);
    res.status(200).send(foundUser);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const foundUser = await searchUser(req.params.userId);
    res.status(200).send(foundUser);
  } catch (err) {
    next(err);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const updateInfo = {
      name: req.body.name,
      about: req.body.about,
    };
    const updatedUserInfo = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateInfo },
      { new: true, runValidators: true },
    );
    res.status(200).send(updatedUserInfo);
  } catch (err) {
    next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const updateAvatarLink = {
      avatar: req.body.avatar,
    };
    const updatedUserAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateAvatarLink },
      { new: true, runValidators: true },
    );
    res.status(200).send(updatedUserAvatar);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  createUser,
  getUsers,
  getUserInfo,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
};
