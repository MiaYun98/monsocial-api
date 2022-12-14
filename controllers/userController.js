const { Thought } = require('../models');
const User = require('../models/User');

module.exports = {
  //get all the users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // get single user 
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: 'thoughts' })
      .then((userOne) => {
        res.json(userOne)
      })
      .catch((err) => res.status(500).json(err));
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // delete a user 
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        Thought.deleteMany({
          _id: {$in: user.thoughts}
        }).then(() => {
          res.json({ message: 'User deleted!' })
        }).catch((err) => {
          res.status(500).json(err)
        });
      })
  },

  // add frineds (update)
  addfriends(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendsId } },
      { runValidators: true, new: true }
    ).then((user) =>
      !user
        ? res.status(404)
          .json({ message: 'No user with that Id' })
        : res.json(user)
    ).catch((err) => {
      console.log(err);
      res.status(500).json(err)
    })
  },

  // remove friends findoneandremove?
  deletefriends(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendsId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with that Id' })
          : res.json(user)
      }).catch((err) => {
        res.status(500).json(err)
      })
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    ).then((user) => {
      !user
        ? res.status(404).json({ message: 'No user with that Id' })
        : res.json(user)
    }).catch((err) => {
      res.status(500).json(err)
    })
  }
};
