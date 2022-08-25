const express = require('express');
const path = require('path');
const dbData = require('../Develop/db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) => {
    res.status(200).json(dbData);
  });

app.post('/api/notes', (req,res) => {
    res.json(`${req.method} request received!`);

    const {title, text} = req.body

    if (title && text) {
    const newNote = {
      title,
      text,
    }
    const response = {
      status: 'success',
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);