const express = require('express');
const path = require('path');

// On the back end, the application should include a db.json file that will be used to store and retrieve notes using the fs module.
const fs = require('fs');
const notesData = require('./db/db.json');

const app = express();
const PORT = 3001;

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
  res.json(notesData);
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
  res.json(notesData);
  // uuid package
});

// HTML route: GET * should return the index.html file.
app.get('*', (req, res) => // If user inputs a route that does not exist in this application, it will send the user to the main page
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
