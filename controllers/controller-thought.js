const { Thought, User } = require('../models')

const thoughtController = {
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            )
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found' })
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    },
    addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
      .then(dbThoughtData => {
        if(!dbThoughtData){
            res.status(404).json({ message: 'No thought found' })
            return;
        }
        res.json(dbThoughtData)
    })
    .catch(err => res.json(err))
    },
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: 'No thought found' });
            }
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
      removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionID: params.reactionId } } },
          { new: true }
        )
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },
      getThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.thoughtId })
      .select('-__v')
      .then(dbThoughtData => {
          if(!dbThoughtData){
              res.status(404).json({ message: 'No thought found' })
              return;
          }
          res.json(dbThoughtData)
      })
      .catch(err => {
          console.log(err);
          res.status(400).json(err)
      })
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId}, body, { new: true, runValidators: true })
    .then(dbThoughtData => {
        if(!dbThoughtData){
            res.status(404).json({ message: 'No thought found' })
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err))
},
}

module.exports = thoughtController;