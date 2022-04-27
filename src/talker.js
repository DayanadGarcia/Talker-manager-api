const crypto = require('crypto');

const { readFile } = require('./readFile');

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;
const HTTP_BAD_REQUEST_STATUS = 400;
const EMAIL_REGEX = /\S+@\S+\.\S+/i;

const getTalker = async (req, res) => { // ---------------------função 1 -------------
  const talks = await readFile();
  if (!talks) {
    return res.status(HTTP_OK_STATUS).json([]);
  } 
    return res.status(HTTP_OK_STATUS).json(talks);
};

const findTalker = async (req, res) => { // -------------------------função 2 -----------------
  const talks = await readFile();

  const { id } = req.params;
  const talkers = talks.find((talk) => talk.id === parseInt(id, 10));

  if (!talkers) {
    return res.status(HTTP_NOTFOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talkers);
};

// const login = (req, res) => { // -----------------------função 3 -------------------------
//   try {
//     const { email, password } = req.body;
//     if ([email, password].includes(undefined)) {
//       return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'missing fields' });
//   }
//     const token = crypto.randomBytes(8).toString('hex');
//     return res.status(HTTP_OK_STATUS).json({ token });
//   } catch (error) {
//     return res.status(500).end();
//   }
//   };

const validateEmail = (req, res, next) => {
  const { email } = req.body;

    if (!email) {
      return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "email" é obrigatório' });
    }
    const valid = EMAIL_REGEX.test(email);

    if (!valid) {
      return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    } next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
try {
  if (!password) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
} catch (error) {
  return res.status(HTTP_BAD_REQUEST_STATUS).end();
}
next();
};

const login = (req, res) => { // ---função 3----
      const token = crypto.randomBytes(8).toString('hex');
      return res.status(HTTP_OK_STATUS).json({ token });
};

const addTalker = (req, res) => {
  const { name, age, talk, watchedAt, rate } = req.body;
  return res.json({ message: `${name}, ${age}, ${talk}, ${watchedAt}, ${rate}` });
};

module.exports = {
  getTalker,
  findTalker,
  login,
  validateEmail,
  validatePassword,
  addTalker,
};
