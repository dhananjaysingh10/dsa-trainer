const express = require('express');

const {getProblems} = require("../controllers/problemController.js")
const router = express.Router();

router.post('/getProblems', getProblems);

module.exports = router