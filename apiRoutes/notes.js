const fs = require('fs');
const path = require('path');
const router = require('express').Router();

// gets save notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/notes.json'));
});


// sets up the route to add new notes to saved notes
router.post('/notes', (req, res) => {
    let saved = JSON.parse(fs.readFileSync('./data/notes.json', 'utf8'));
    let newNote = req.body;
    newNote.id = saved.length;
    console.log(newNote);
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
    console.log(saved, noteID);
    saved.splice(noteID, 1);
    console.log(saved)
});

module.exports = router;