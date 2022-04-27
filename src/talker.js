const crypto = require('crypto');
const { readFile } = require('./readFile');

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;
const Unauthorized = 401;

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

const login = (req, res) => { // -----------------------função 3 -------------------------
  try {
    const { email, password } = req.body;
    if ([email, password].includes(undefined)) {
      return res.status(Unauthorized).json({ message: 'missing fields' });
  }
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (error) {
    return res.status(500).end();
  }
  };

module.exports = {
  getTalker,
  findTalker,
  login,
};