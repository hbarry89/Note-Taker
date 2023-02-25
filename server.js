const express = require('express');
const path = require('path');

const notesData = require('./db.json');

const app = express();
const PORT = 3001;

app.use(express.static('public')); //Takes you to index.html by default

app.get('/', (req, res) => res.send('Main Page')); //index.html (this line is not needed because of static public above)

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);