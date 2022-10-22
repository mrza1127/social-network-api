const router = require('express').Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../../controllers/controller-user')

router
    .route('/')
    .get(getUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)


module.exports = router;