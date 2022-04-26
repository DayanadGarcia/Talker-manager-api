const express = require('express');
const { getTalker, findTalker } = require('./talker');

const router = express.Router();

router.get('/talker', getTalker);

router.get('/talker/:id', findTalker);

module.exports = router;