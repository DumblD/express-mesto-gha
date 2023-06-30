const router = require('express').Router();
const {
  validateCardsPost,
  validateCardsId,
} = require('../appconfig/appConfig');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', validateCardsPost, createCard);

router.delete('/cards/:cardId', validateCardsId, deleteCard);

router.put('/cards/:cardId/likes', validateCardsId, likeCard);

router.delete('/cards/:cardId/likes', validateCardsId, dislikeCard);

module.exports = router;
