
const express = require('express');
const router = express.Router();

let notes = [];
let nextId = 1;


//Adding note
router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  const newNote = {
    id: nextId++,title,content
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});



// deleting note
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex(n => n.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Note not found.' });
  }

  const deletedNote = notes.splice(index, 1);
  res.json({ message: 'Note deleted successfully.', note: deletedNote[0] });
});


//updating note
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const note = notes.find(n => n.id === parseInt(id));

  if (!note) {
    return res.status(404).json({ message: 'Note not found.' });
  }

  if (title) note.title = title;
  if (content) note.content = content;

  res.json(note);
});



// GET all notes
router.get('/', (req, res) => {
  res.json(notes);
});




module.exports = router;
