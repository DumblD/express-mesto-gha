const User = require('../models/user');
const { getInternalErrorMessage, sendError } = require('../utils/errorMessageConfig');
const { isEmptyValues } = require('../utils/validationFunctions');

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
    const user = await User.findById(req.params.userId).select('-__v');
    res.status(200).send(user);
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
    if (!isEmptyValues(updateInfo)) {
      const updatedUserInfo = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updateInfo },
        { new: true },
      ).select('-__v');
      res.status(200).send(updatedUserInfo);
    } else {
      throw new Error('ValidationError');
    }
  } catch (err) {
    sendError(err, res);
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const updateAvatarLink = {
      avatar: req.body.avatar,
    };
    if (!isEmptyValues(updateAvatarLink)) {
      const updatedUserAvatar = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updateAvatarLink },
        { new: true },
      ).select('-__v');
      res.status(200).send(updatedUserAvatar);
    } else {
      throw new Error('ValidationError');
    }
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
