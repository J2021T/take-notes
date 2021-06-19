const fs = require('fs');
const path = require('path');
const router = require('express').Router();

// gets saved notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/notes.json'));
});

// sets up the route to add new notes to saved notes
router.post('/notes', (req, res) => {
    let saved = JSON.parse(fs.readFileSync('./data/notes.json', 'utf8'));
    let newNote = req.body;
    newNote.id = saved.length;
    saved.push(newNote);
    
    fs.writeFile('./data/notes.json', JSON.stringify(saved), (err) => {
        if (err) throw err;
        console.log('The file has been updated');
        res.json(saved);
    });
});

// deletes saved notes
router.delete('/notes/:id', (req, res) => {
    let saved = JSON.parse(fs.readFileSync('./data/notes.json', 'utf8'));
    let noteID = req.params.id;
    saved.splice(noteID, 1);
    saved.forEach((note, index) => {
        note.id = index;
    });

    fs.writeFile('./data/notes.json', JSON.stringify(saved), (err) => {
        if (err) throw err;
        console.log('The note has been deleted!');
        res.json(saved);
    });
});

module.exports = router;