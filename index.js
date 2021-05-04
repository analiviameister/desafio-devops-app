const express = require('express')
const app = express()
const port = 3000;

app.listen(port);
console.log(`Acesse http://localhost: ${port}`);
app.get('/', (req, res) => {
  const candidato = process.env.CANDIDATO || 'Ana Lívia Aranha Meister';
  res.send(`Bem-vinda ${candidato}!`);
});

app.get('/actuator/health', (req, res) => {
  const healthcheck = process.env.STATUS || 'UP';
  res.send(`Status APP = ${healthcheck}!`);
});

var log4js = require('log4js');
var esAppenderConfig = {
  url: 'http://elastic:changeme@10.15.1.3:9200'
};
var log4jsESAppender = require('log4js-elasticsearch').configure(esAppenderConfig);
log4js.addAppender(log4js, 'tests');
