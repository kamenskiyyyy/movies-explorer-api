const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', usersRouter)
router.use('/movies', moviesRouter)

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не существует');
});

module.exports = router;