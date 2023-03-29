const { User, Thought } = require('../models');


module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.status(200).json(thoughts))
            .catch((err) => res.status(500).json(err));
    },


    getThoughtId(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought does not exist!' })
                    : res.json(thought)
            )
            .cathc((err) => res.status(500).json(err));
    },


    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thougth))
            .catch((err) => res.status(500).json(err));
    },


    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought does not exist!' })
                    : Thought.findOneAndUpdate(
                        { thoughts: req.params.id },
                        { $pull: { thoughts: req.params.id } },
                        { message: 'Thought Deleted' }
                    ))
    },


    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought does not exist!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },


    createReaction(req, res) {
        Thought.findOneAndUpdate( 
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .populate('reactions')
            .then((thought) =>
                !thought
                    ? res.status(404).json( { message: 'Thought does not exist!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },


    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json( { message: 'Thought does not exist!' });
                }
                res.status(200).json( { message: 'Reaction Deleted', thought });
            })
            .catch((err) => res.status(500).json(err));
    },

};