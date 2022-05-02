const express = require('express');
const fs = require('fs').promises;
const { readFile } = require('./readFile');

const HTTP_CREATED_STATUS = 201;

const {
  getTalker, findTalker, login, validateEmail, validatePassword,
  validateName, validateAge, validateTalk,
  validateRate, validateDate, validateToken,
   } = require('./talker');

const router = express.Router();

router.get('/talker', getTalker);

router.get('/talker/:id', findTalker);

router.post('/login', validateEmail, validatePassword, login);

router.post('/talker', validateToken, validateName, validateAge, validateTalk,
validateRate, validateDate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talks = await readFile();
  const newTalker = {
    id: talks.length + 1,
    name,
    age,
    talk: {
      watchedAt: talk.watchedAt,
      rate: talk.rate,
    },
  };
  const newTalkersData = [...talks, newTalker];
  await fs.writeFile('./talker.json', JSON.stringify(newTalkersData));
  return res.status(HTTP_CREATED_STATUS).json(newTalker);
});

module.exports = router;