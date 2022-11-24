const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addfriends,
  deletefriends,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser)

// /api/users/:userId/friends
router.route('/:userId/friends').post(addfriends).delete(deletefriends)

module.exports = router;
