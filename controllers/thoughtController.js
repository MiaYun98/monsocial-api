const { User, Thought } = require('../models');

module.exports = {
    // get all thought
    getThought(req, res) {
        Thought.find()
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // get single thought 
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.userId })
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            });
    },

    // create thought 
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return Thought.findOneAndUpdate(
                    { _id: req.body.thoughtId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
            })
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Tag created, but found no post with that ID' })
                    : res.json('Created the tag 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // update thought 
    updateThought(req, res) {
        Thought.findOndAndUpdate(
            { _id: req.body.userId },
            { $set: req.body },
            { runValidators: true },
            { new: true },
        ).then((thought) => {
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought with that Id' });
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    // delete thought 
    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: req.params.id }
        ).then((thought) => {
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought with that Id' })
                : User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $pull: { thoughts: thought._id } },
                    { new: true },
                ).then(() => {
                    res.json({ message: 'Thought deleted!' });
                }).catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
        })
    },

    // add reaction 
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true },
            { new: true }
        ).then((thought) => {
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought with that Id' })
                : res.json(thought)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    // delete reaction 
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true },
            { new: true }
        ).then((thought) => {
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought with that Id' })
                : res.json(thought)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    }
}