const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    // eslint-disable-next-line no-useless-escape
    match: /^https?:\/\/[A-Za-z0-9-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]+$/,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('card', cardSchema);
