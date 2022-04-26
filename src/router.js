const express = require('express');
const { getTalker, findTalker, login } = require('./talker');

const router = express.Router();

router.get('/talker', getTalker);

router.get('/talker/:id', findTalker);

router.post('/login', login);

module.exports = router;