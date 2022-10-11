const api = require('express').Router();
const { readFromFile, readAndAppend, writeToFile,  } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');



api.get('/notes', (req, res) => {
    
    readFromFile('./Develop/db/db.json').then((data) => res.json(JSON.parse(data)));
});

api.delete('/notes/:id', (req,res) => {
    const requestedId = req.params.id;
    
    const data = require('../Develop/db/db.json');

    for (let i = 0; i < data.length; i++) {
        const currentNote = data[i];
        if (currentNote.id == requestedId) {
          data.splice(i,1);
          console.log(data);
          
          
          writeToFile('./Develop/db/db.json', data);
          res.json(JSON.parse(data));
          return;
        }
      }
});

api.post('/notes', (req, res) => {

    const { title, text } = req.body;
    

    if (title && text) {

      const newNote = {
        title,
        text,
        id: uuid(),
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