const router = require('express').Router();
const {
  getUsers, getUser, updateProfile, updateAvatar, getUserData,
} = require('../controllers/users');

router.get('/users/me/', getUserData);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/me/', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
