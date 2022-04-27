const express = require('express');
const {
  getTalker, findTalker, login, validateEmail, validatePassword, addTalker } = require('./talker');

const router = express.Router();

router.get('/talker', getTalker);

router.get('/talker/:id', findTalker);

router.post('/login', validateEmail, validatePassword, login);

router.post('/talker', addTalker);

module.exports = router;