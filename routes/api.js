const api = require('express').Router();

api.get('/', (req, res) => {
    console.info(`${req.method} request received for api`);
   
  });

  
module.exports = api;