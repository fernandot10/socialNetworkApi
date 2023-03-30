const router = require('express').Router();

const {
    getUsers,
    getUserId,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserId)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:id/friends/:friendsId')
    .post(addFriend)
    .delete(deleteFriend);


module.exports = router;