const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  patchProfile,
  pacthAratar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserById);
router.patch('/me', patchProfile);
router.patch('/me/avatar', pacthAratar);

module.exports = router;
