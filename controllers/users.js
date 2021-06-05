const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

dotenv.config();

const {
  NODE_ENV,
  JWT_SECRET
} = process.env;

// Получить данные о текущем пользователе
const getMyUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('Нет пользователя с таким id'))
    .then(user => res.status(200)
      .send(user))
    .catch(err => {
      if (err.name === 'CastError') {
        throw new ValidationError('Id неверный');
      }
      throw new NotFoundError(err.message);
    })
    .catch(next);
};

// Обновить данные пользователя
const updateProfile = (req, res, next) => {
  const {
    name,
    email
  } = req.body;
  if (!name || !email) {
    throw new ValidationError('Введенные данные некорректны');
  }
  User.findByIdAndUpdate(req.user._id, {
    name, email
  }, {
    new: true, // в then попадет обновленная запись
    runValidators: true // валидация данных перед изменением
  })
    .orFail(new Error('Нет пользователя с таким Id'))
    .then(data => res.status(200)).send(data)
    .catch(err => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Введенные данные некорректны');
      }
      throw new NotFoundError(err.message);
    })
};

module.exports = {
  getMyUser,
  updateProfile
};
