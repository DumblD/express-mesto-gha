const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    // eslint-disable-next-line no-useless-escape
    match: /^https?:\/\/[A-Za-z0-9-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]+$/,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    select: false,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('user', userSchema);
