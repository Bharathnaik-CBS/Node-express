
const express = require('express');
const app = express();

app.use(express.json());

let notes = []; 

//addding notes
app.post('/notes', (req, res) => {
  const note = req.body;
  notes.push(note);
  res.status(201).json({ message: 'Note added!', note });
});


//Viewing all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});


//Updating notes
app.put('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const updatedNote = req.body;

  const index = notes.findIndex(note => note.id === noteId);
  if (index !== -1) {
    notes[index] = { id: noteId, ...updatedNote };
    res.json(notes[index]);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});


//Deleting notes
app.delete('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const index = notes.findIndex(note => note.id === noteId);

  if (index !== -1) {
    const deleted = notes.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});




//server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
