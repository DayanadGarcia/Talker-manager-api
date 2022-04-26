const { readFile } = require('./readFile');

const HTTP_OK_STATUS = 200;

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
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talkers);
};

const login = (req, res) => res.json({ // -----------------------função 3 ------------------
    email: 'email@email.com',
    password: '123456',
  });

module.exports = {
  getTalker,
  findTalker,
  login,
};