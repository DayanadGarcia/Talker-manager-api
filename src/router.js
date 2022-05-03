const express = require('express');
const fs = require('fs').promises;
const { readFile } = require('./readFile');

const HTTP_CREATED_STATUS = 201;
const HTTP_OK_STATUS = 200;

const {
  getTalker, findTalker, login, validateEmail, validatePassword,
  validateName, validateAge, validateTalk,
  validateRate, validateDate, validateToken, validateId,
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

router.put('/talker/:id', validateId, validateToken, validateName, validateAge, validateTalk,
validateRate, validateDate, async (req, res) => {
  const { talk: { watchedAt, rate }, name, age } = req.body;
  const { id } = req.params;

  const talkerId = Number(id); // pega o id, transforma em num e insere no obj
  const updateTalker = {
    id: talkerId,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
   return res.status(HTTP_OK_STATUS).json(updateTalker);
});

module.exports = router;