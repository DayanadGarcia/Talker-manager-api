const crypto = require('crypto');
const moment = require('moment');
const { readFile } = require('./readFile');

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;

const EMAIL_REGEX = /\S+@\S+\.\S+/i;

const getTalker = async (req, res) => {
  const talks = await readFile();
  if (!talks) {
    return res.status(HTTP_OK_STATUS).json([]);
  } 
    return res.status(HTTP_OK_STATUS).json(talks);
};

const findTalker = async (req, res) => {
  const talks = await readFile();

  const { id } = req.params;
  const talkers = talks.find((talk) => talk.id === parseInt(id, 10));

  if (!talkers) {
    return res.status(HTTP_NOTFOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talkers);
};

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

const login = (req, res) => {
      const token = crypto.randomBytes(8).toString('hex');
      return res.status(HTTP_OK_STATUS).json({ token });
};

const validateToken = (req, res, next) => {
  // Esse trecho de validadação de token usando o regex foi retirado do course
  const token = req.headers.authorization;
  const tokenRegex = new RegExp(/^[a-zA-Z0-9]{16}$/);

  if (!tokenRegex.test(token)) {
  return res.status(HTTP_UNAUTHORIZED_STATUS)
    .json({ message: 'Token inválido' }); 
}
  if (token === '' || !token) {
  return res.status(HTTP_UNAUTHORIZED_STATUS)
    .json({ message: 'Token não encontrado' });
}
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age || age === '') {
      return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "age" é obrigatório' });
    }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

const validateDate = (req, res, next) => {
  const { talk } = req.body;
  // usei um framework de manipulação de data o moment js, importado acima
  // verifica se a data de watchedAt é correspondente ao formato dd mm yyyy e retorna um bool
  const date = moment(talk.watchedAt, 'DD/MM/YYYY', true).isValid();
  if (!date) {
      return res.status(HTTP_BAD_REQUEST_STATUS).json({
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  });
  }
  next();
};

function between(x, min, max) { // func delimita um range/intervalo de numeros - stackOverFlow
  return Number(x >= min && x <= max);
}

const validateRate = (req, res, next) => {
  try {
     const { talk: { rate } } = req.body;
  if (!(between(rate, 1, 5))) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
  .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  } catch (error) {
    return res.status(500).end();
  }
  next();
};

const isUndefined = (sesion) => sesion === '' || !sesion; // verifica se o campo é undefined

const validateTalk = (req, res) => {
  const { talk } = req.body;
  if (isUndefined(talk) || isUndefined(talk.watchedAt) || isUndefined(talk.rate)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
};

module.exports = {
  getTalker,
  findTalker,
  login,
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateTalk,
};
