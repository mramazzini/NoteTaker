const api = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

api.get('/', (req, res) => {
    console.info(`${req.method} request received for api`);
   
  });

api.get('/notes', (req, res) => {
    readFromFile('./Develop/db/db.json').then((data) => res.json(JSON.parse(data)));
});


api.post('/notes', (req, res) => {

    const { title, text } = req.body;
  

    if (title && text) {

      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './Develop/db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
  });
  
module.exports = api;