const {
  getMovies,
  createMovie,
  deleteMovie
} = require('../controllers/movies');
const router = require('express')
  .Router();

router.get('/', getMovies); // возвращает все сохранённые пользователем фильмы
router.post('/', createMovie); // создаёт фильм с переданными в теле данными
router.delete('/:movieId', deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
