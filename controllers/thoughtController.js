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
        Thought.findOne({_id: req.params.thoughtId})
            .then((thought) => {
                !thought
                    ? res.status(404).json({message: 'No thought with that ID'})
                    : res.json(thought)
            });
    },

    // create thought 
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$addToSet: {thoughts: thought._id}},
                    {new: true}
                )
            })
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({message: 'Thought created'})
                    : res.json('Created the thought 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // update thought 
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true},
        ).then((thought) => {
            !thought
                ? res
                    .status(404)
                    .json({message: 'No thought with that Id'})
                :res.json(thought)
        }).catch((err) => {
                    console.log(err);
                    res.status(500).json(err)
                });
    },

    // delete thought 
    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: req.params.thoughtId }
        ).then((thought) => {
            !thought
                ? res
                    .status(404)
                    .json({message: 'No thought with that Id'})
                : User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$pull: { thoughts: thought._id}},
                    {new: true},
                ).then(() => {
                    res.json({ message: 'Thought deleted! from the user' });
                }).catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
        })
    },

    // add reaction 
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
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
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
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