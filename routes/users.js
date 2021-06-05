const router = require('express').Router();

router.get('/me'); // возвращает информацию о пользователе (email и имя)
router.patch('/me'); // обновляет информацию о пользователе (email и имя)

module.exports = router;
