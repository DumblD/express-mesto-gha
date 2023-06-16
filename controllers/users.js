const mongoose = require('mongoose');
const User = require('../models/user');
const { getInternalErrorMessage, sendError } = require('../utils/errorMessageConfig');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-__v');
    res.status(200).send({ data: users });
  } catch (err) {
    getInternalErrorMessage(err, res);
  }
};

const getUserById = async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.userId)) {
      const user = await User.findById(req.params.userId)
        .orFail(new Error('CastError'));
      res.status(200).send(user);
    } else {
      throw new Error('ValidationError');
    }
  } catch (err) {
    sendError(err, res);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const createdUser = await User.create({ name, about, avatar });
    const newUser = JSON.parse(JSON.stringify(createdUser));
    delete newUser.__v;
    res.status(201).send(newUser);
  } catch (err) {
    sendError(err, res);
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const updateInfo = {
      name: req.body.name,
      about: req.body.about,
    };
    const updatedUserInfo = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateInfo },
      { new: true, runValidators: true },
    ).select('-__v');
    res.status(200).send(updatedUserInfo);
  } catch (err) {
    sendError(err, res);
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const updateAvatarLink = {
      avatar: req.body.avatar,
    };
    const updatedUserAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateAvatarLink },
      { new: true, runValidators: true },
    ).select('-__v');
    res.status(200).send(updatedUserAvatar);
  } catch (err) {
    sendError(err, res);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
