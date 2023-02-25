const express = require('express');
const path = require('path');

const notesData = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.static('public')); // Makes the route "/" index.html by defult

// Not really needed since the above is doing the same: (keeping it for now to keep track of route paths visually in the code)
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Sends data as an html file (front-end)
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Sends data as a json file database (back-end)
app.get('/api/notes', (req, res) => { // Change route because 2 methods cannot have same route (using api path as it is commonly known route for backend database)
  res.json(notesData);
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);