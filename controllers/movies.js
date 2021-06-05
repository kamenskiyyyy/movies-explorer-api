const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

//  Получить все фильмы
const getMovies = (req, res, next) => {
  Movie.find({})
    .then(movies => res.status(200)
      .send(movies))
    .catch(next);
};

// Создать фильм
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  } = req.body;
  if (!country
    || !director
    || !duration
    || !year
    || !description
    || !image
    || !trailer
    || !nameRU
    || !nameEN
    || !thumbnail
    || !movieId) {
    next(new ValidationError('Данные неверны'));
  }
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id
  })
    .then(movie => res.status(200)
      .send(movie))
    .catch(err => {
      throw new ValidationError('Данные неверны');
    })
    .catch(next);
};

// Удалить фильм
const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  Movie.findById(req.params.movieId)
    .orFail(new Error('Такой фильм отсутствует'))
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        next(new ForbiddenError('Вы не можете удалить чужой фильм'));
      }
      Movie.findByIdAndDelete(req.params.movieId)
        .then((data) => res.status(200)
          .send(data))
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new ValidationError('Id неверный'));
          }
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Id неверный'));
      } else {
        next(new NotFoundError(err.message));
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie
};
