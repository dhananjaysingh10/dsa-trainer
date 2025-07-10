const express = require('express');
const {signup, signin, google, checkSession} = require('../controllers/authController.js');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/check', checkSession);

module.exports = router;