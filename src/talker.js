const talker = require('../talker.json');

const HTTP_OK_STATUS = 200;

const getTalker = (req, res) => {
  if (!talker) {
    return res.status(HTTP_OK_STATUS).json([]);
  } 
    return res.status(HTTP_OK_STATUS).json(talker);
};

const findTalker = (req, res) => {
  const { id } = req.params;
  const talkers = talker.find((talk) => talk.id === parseInt(id, 10));

  if (!talkers) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talkers);
};

module.exports = {
  getTalker,
  findTalker,
};