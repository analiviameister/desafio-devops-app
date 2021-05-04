const express = require('express')
const app = express()
const port = 3000;

app.listen(port);
console.log(`Acesse http://localhost: ${port}`);
app.get('/', (req, res) => {
  const candidato = process.env.CANDIDATO || 'Ana Lívia Aranha Meister';
  res.send(`Bem-vinda ${candidato}!`);
});

app.get('/actuator/health', (req, res, next) => {
  const healthcheck = process.env.STATUS || 'UP';
  res.send(`Status APP = ${healthcheck}!`);
  console.log(req);
});

const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    logstash: {
      url: 'http://elastic:changeme@10.15.1.3:9200/_bulk',
      type: '@log4js-node/logstash-http',
      logType: 'application',
      logChannel: 'node',
      application: 'logstash-log4js',
      layout: {
        type: 'pattern',
        pattern: '%m'
      }
    }
  },
  categories: {
    default: { appenders: ['console', 'logstash'], level: 'info' }
  }
});

const logger = log4js.getLogger('myLogger')
;
logger.addContext('requestId', '123');
logger.info('some interesting log message $s');
logger.error('something has gone wrong');
 