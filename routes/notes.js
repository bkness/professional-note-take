const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))); // reads all files from json file and then sends it to the client in json format (stringifies and does other fun stuff consult google later pls)
});

// // DELETE Route for a specific note
// tips.delete('/:note_id', (req, res) => {
//   const tipId = req.params.note_id;
//   readFromFile('./db/notes.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       // Make a new array of all tips except the one with the ID provided in the URL
//       const result = json.filter((note) => note.note_id !== noteId);

//       // Save that array to the filesystem
//       writeToFile('./db/notes.json', result);

//       // Respond to the DELETE request
//       res.json(`Item ${noteId} has been deleted 🗑️`);
//     });
// });

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => { // note hads a titlke and text 
  console.log(req.body);

  const { title, text } = req.body;  // title and text propertiers of req body

  if (req.body) {
    const newNotes = {
      title, text,   // takes the title and text and makes a new id for our database (json file)
      id: uuidv4(),
    };

    readAndAppend(newNotes, './db/db.json');
    res.json(`Notes added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
