const api = require('express').Router();

api.get('/', (req, res) => {
    console.info(`${req.method} request received for api`);
   
  });

api.get('/notes', (req, res) => {
    readFromFile('./Develop/db/notes.json').then((data) => res.json(JSON.parse(data)));
});
  
module.exports = api;