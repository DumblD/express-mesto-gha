const { celebrate, Joi } = require('celebrate');

const validateUsersMeInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'Поле "name" должно быть текстовым полем',
        'string.empty': 'Поле "name" должно быть заполнено',
        'string.min': 'Поле "name" - минимальная длина {#limit}',
        'string.max': 'Длина поля "name" должна быть меньше или равна {#limit}',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'Поле "about" должно быть текстовым полем',
        'string.empty': 'Поле "about" должно быть заполнено',
        'string.min': 'Поле "about" - минимальная длина {#limit}',
        'string.max': 'Длина поля "about" должна быть меньше или равна {#limit}',
        'any.required': 'Поле "about" должно быть заполнено',
      }),
  }),
});

const validateUsersMeAvatar = celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().pattern(/^https?:\/\/[A-Za-z0-9-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]+$/)
      .messages({
        'string.base': 'Поле "avatar" должно быть текстовым полем',
        'string.empty': 'Поле "avatar" должно быть заполнено',
        'any.required': 'Поле "avatar" должно быть заполнено',
        'string.pattern.base': 'Поле "avatar" должно соответствовать шаблону: {#regex}',
      }),
  }),
});

const validateUsersSearchById = celebrate({
  params: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    userId: Joi.string().required().hex().length(24)
      .messages({
        'string.base': '"userId" должно быть текстовым полем',
        'string.empty': '"userId" должно быть заполнено',
        'any.required': '"userId" должно быть заполнено',
        'string.hex': '"userId" должен содержать только шестнадцатеричные символы',
        'string.length': 'Длина "userId" должна составлять {#limit} символов',
      }),
  }),
});

const validateCardsPost = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'Поле "name" должно быть текстовым полем',
        'string.empty': 'Поле "name" должно быть заполнено',
        'string.min': 'Поле "name" - минимальная длина {#limit}',
        'string.max': 'Длина поля "name" должна быть меньше или равна {#limit}',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().pattern(/^https?:\/\/[A-Za-z0-9-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]+$/)
      .messages({
        'string.base': 'Поле "link" должно быть текстовым полем',
        'string.empty': 'Поле "link" должно быть заполнено',
        'any.required': 'Поле "link" должно быть заполнено',
        'string.pattern.base': 'Поле "link" должно соответствовать шаблону: {#regex}',
      }),
  }),
});

const validateCardsId = celebrate({
  params: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    cardId: Joi.string().required().hex().length(24)
      .messages({
        'string.base': '"cardId" должно быть текстовым полем',
        'string.empty': '"cardId" должно быть заполнено',
        'any.required': '"cardId" должно быть заполнено',
        'string.hex': '"cardId" должен содержать только шестнадцатеричные символы',
        'string.length': 'Длина "cardId" должна составлять {#limit} символов',
      }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.base': 'Поле "email" должно быть текстовым полем',
        'string.empty': 'Поле "email" должно быть заполнено',
        'any.required': 'Поле "email" должно быть заполнено',
        'string.email': 'Поле "email" должно быть валидным email-адресом',
      }),
    password: Joi.string().required()
      .messages({
        'string.base': 'Поле "password" должно быть текстовым полем',
        'string.empty': 'Поле "password" должно быть заполнено',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.base': 'Поле "email" должно быть текстовым полем',
        'string.empty': 'Поле "email" должно быть заполнено',
        'any.required': 'Поле "email" должно быть заполнено',
        'string.email': 'Поле "email" должно быть валидным email-адресом',
      }),
    password: Joi.string().required()
      .messages({
        'string.base': 'Поле "password" должно быть текстовым полем',
        'string.empty': 'Поле "password" должно быть заполнено',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.base': 'Поле "name" должно быть текстовым полем',
        'string.empty': 'Поле "name" должно быть заполнено',
        'string.min': 'Поле "name" - минимальная длина {#limit}',
        'string.max': 'Длина поля "name" должна быть меньше или равна {#limit}',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.base': 'Поле "about" должно быть текстовым полем',
        'string.empty': 'Поле "about" должно быть заполнено',
        'string.min': 'Поле "about" - минимальная длина {#limit}',
        'string.max': 'Длина поля "about" должна быть меньше или равна {#limit}',
      }),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/^https?:\/\/[A-Za-z0-9-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]+$/)
      .messages({
        'string.base': 'Поле "avatar" должно быть текстовым полем',
        'string.empty': 'Поле "avatar" должно быть заполнено',
        'string.pattern.base': 'Поле "avatar" должно соответствовать шаблону: {#regex}',
      }),
  }),
});

module.exports = {
  validateUsersMeInfo,
  validateUsersMeAvatar,
  validateUsersSearchById,
  validateCardsPost,
  validateCardsId,
  validateAuthentication,
  validateRegistration,
};
