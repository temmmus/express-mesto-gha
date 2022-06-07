const router = require('express').Router();
const {
  getUsers,
  getUser,
  patchProfile,
  pacthAratar,
  createUser,
  login
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', patchProfile);
router.patch('/me/avatar', pacthAratar);

module.exports = router;
