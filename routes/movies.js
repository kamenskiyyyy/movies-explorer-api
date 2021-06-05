const router = require('express').Router();

router.get('/'); // возвращает все сохранённые пользователем фильмы
router.post('/'); // создаёт фильм с переданными в теле данными
router.delete('/:movieId'); // удаляет сохранённый фильм по id

module.exports = router;
