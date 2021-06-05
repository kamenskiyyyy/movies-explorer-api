const {
  updateProfile,
  getMyUser
} = require('../controllers/users');
const router = require('express')
  .Router();

router.get('/me', getMyUser); // возвращает информацию о пользователе (email и имя)
router.patch('/me', updateProfile); // обновляет информацию о пользователе (email и имя)

module.exports = router;
