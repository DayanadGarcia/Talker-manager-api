const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/router');

const app = express();
const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});// 

app.use(router);

app.listen(PORT, () => {
  console.log('Online');
});
