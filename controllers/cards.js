const Card = require('../models/card');
const ForbiddenError = require('../utils/customErrorsClasses/ForbiddenError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(200).send({ data: cards });
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const { name, link } = req.body;
    const createdCard = await Card.create({ name, link, owner: ownerId });
    const newCard = JSON.parse(JSON.stringify(createdCard));
    delete newCard.__v;
    res.status(201).send(newCard);
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const ownId = req.user._id;
    const selectedCard = await Card.findById(req.params.cardId)
      .orFail();
    const cardIdOwner = selectedCard.owner.toString();
    if (ownId !== cardIdOwner) {
      throw new ForbiddenError('Недостаточно прав');
    }
    await selectedCard.deleteOne();
    res.status(200).send({ message: 'Пост удалён' });
  } catch (err) {
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const cardLikesUpdated = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .orFail();
    res.status(200).send(cardLikesUpdated);
  } catch (err) {
    next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const cardLikesUpdated = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .orFail();
    res.status(200).send(cardLikesUpdated);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
