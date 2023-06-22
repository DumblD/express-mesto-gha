const mongoose = require('mongoose');
const Card = require('../models/card');
const { sendError } = require('../utils/errorMessageConfig');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send({ data: cards });
  } catch (err) {
    sendError(err, res);
  }
};

const createCard = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const { name, link } = req.body;
    const createdCard = await Card.create({ name, link, owner: ownerId });
    const newCard = JSON.parse(JSON.stringify(createdCard));
    delete newCard.__v;
    res.status(201).send(newCard);
  } catch (err) {
    sendError(err, res);
  }
};

const deleteCard = async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.cardId)) {
      await Card.findByIdAndRemove(req.params.cardId)
        .orFail(new Error('CastError'));
      res.status(200).send({ message: 'Пост удалён' });
    } else {
      throw new Error('ValidationError');
    }
  } catch (err) {
    sendError(err, res);
  }
};

const likeCard = async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.cardId)) {
      const cardLikesUpdated = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      )
        .orFail(new Error('CastError'));
      res.status(200).send(cardLikesUpdated);
    } else {
      throw new Error('ValidationError');
    }
  } catch (err) {
    sendError(err, res);
  }
};

const dislikeCard = async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.cardId)) {
      const cardLikesUpdated = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
        .orFail(new Error('CastError'));
      res.status(200).send(cardLikesUpdated);
    } else {
      throw new Error('ValidationError');
    }
  } catch (err) {
    sendError(err, res);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
