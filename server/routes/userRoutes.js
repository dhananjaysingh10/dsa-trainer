const express = require('express');

const {test, updateUser, deleteUser, signOut, getUsers, getUser, getProfile} = require("../controllers/userController.js")
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.get('/test', test);

router.put('/update/:userId', verifyToken, updateUser);

router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signOut);
router.get('/getusers', verifyToken, getUsers);
router.get('/profile/:username', getProfile);
// router.get('/cfprofile/:username', getCfProfile);
// router.get('/:userId', getUser);

module.exports = router