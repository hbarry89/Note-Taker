const express = require('express');
const path = require('path');

// On the back end, the application should include a db.json file that will be used to store and retrieve notes using the fs module.
const fs = require('fs');
const notesData = require('./db/db.json');

const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Router Module
//const router = require('./router');
//app.use('/', router);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Makes the route "/" into index.html by defult and reads files in public folder
app.use(express.static('public'));

// Below code is not needed since the above is doing the same.
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/index.html'))
// );

// HTML route: GET /notes should return the notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// API route: GET /api/notes sould read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((notesData) => res.json(JSON.parse(notesData)));
});

app.post('/api/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

//Bonus
// DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete.
// To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete('/api/notes/:id', (req, res) => {
  // read and append
  const inputId = req.params.id;

  // Iterate through the notes id to check if it matches `req.params.id`
  for (let i = 0; i < notesData.length; i++) {
    if (inputId === notesData[i].id) {
      return res.json('Note has been deleted!');
    }
  }

  // Return a message if the id doesn't exist in our DB
  return res.json('Note not found');
});

// HTML route: GET * should return the index.html file.
app.get('*', (req, res) => // If user inputs a route that does not exist in this application, it will send the user to the main page
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);