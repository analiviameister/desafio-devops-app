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
    log4js.configure({
        "appenders": [
            {
                "category": "tests", 
                "type": "logLevelFilter",
                "level": "WARN",
                "appender": {
                    "type": "log4js-elasticsearch",
                    "url": "http://127.0.0.1:9200"
                }
            },
            { 
                "category": "tests", 
                "type": "console"
            }
        ],
        "levels": {
            "tests":  "DEBUG"
        }
    });

    var log = log4js.getLogger('tests');
    
    log.error('hello hello');

    if (setTimeout(function() {}).unref === undefined) {
        console.log('force flushing and goodbye for node <= 0.8');
        require('log4js-elasticsearch').flushAll(true);
    }