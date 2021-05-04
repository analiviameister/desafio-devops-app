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
  const healthcheck = process.env.STATUS || '200';
  res.send(`UP - Status Code = ${healthcheck}!`);
});


