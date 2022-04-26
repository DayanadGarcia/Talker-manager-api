const fs = require('fs').promises;

const readFile = async () => {
 const file = await fs.readFile('./talker.json');
 const response = JSON.parse(file);
 return response;
};

module.exports = {
  readFile,
};